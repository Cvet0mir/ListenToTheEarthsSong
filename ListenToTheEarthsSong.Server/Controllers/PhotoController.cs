using System.Security.Claims;
using ListenToTheEarthsSong.Core.Interfaces;
using ListenToTheEarthsSong.Data.Enums;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;

namespace ListenToTheEarthsSong.Server.Controllers;

[ApiController]
[Route("api/photos")]
public class PhotoController : ControllerBase
{
    private readonly IPhotosService _service;
    private readonly IWebHostEnvironment _environment;
    private readonly IAntiforgery _antiforgery;

    public PhotoController(IPhotosService service, IWebHostEnvironment environment, IAntiforgery antiforgery)
    {
        _service = service;
        _environment = environment;
        _antiforgery = antiforgery;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPhotos([FromQuery] DateTime? sortByDate)
    {
        var photos = await _service.GetAllPhotosAsync(sortByDate);
        return Ok(photos.Select(p => new
        {
            id = p.Id,
            title = p.ImgName,
            imageUrl = p.ImgUrl,
            description = p.Description,
            category = p.Category.ToString(),
            author = p.UploadedBy?.Username ?? "",
            uploadedAt = p.UploadedAt,
            uploadedById = p.UploadedById
        }));
    }

    [HttpGet("categories")]
    public IActionResult GetCategories() => Ok(Enum.GetNames<PhotoCategory>());

    // Returns a header token; the browser also receives the anti-forgery cookie.
    [HttpGet("antiforgery")]
    public IActionResult GetAntiforgeryToken()
    {
        var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
        Response.Headers.CacheControl = "no-store";
        return Ok(new { token = tokens.RequestToken });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    [RequestSizeLimit(6 * 1024 * 1024)]
    public async Task<IActionResult> CreatePhoto(
        [FromForm] string title,
        [FromForm] string description,
        [FromForm] string category,
        [FromForm] IFormFile photo)
    {
        var userId = CurrentUserId();
        if (userId == null) return Unauthorized();

        if (string.IsNullOrWhiteSpace(title) || title.Length > 100 ||
            string.IsNullOrWhiteSpace(description) || description.Length > 500)
            return BadRequest("Title (max 100) and description (max 500) are required.");

        if (!Enum.TryParse<PhotoCategory>(category, true, out var parsedCategory) ||
            !Enum.IsDefined(parsedCategory))
            return BadRequest("Invalid category.");

        if (photo == null || photo.Length == 0 || photo.Length > 5 * 1024 * 1024)
            return BadRequest("Image must be 1 byte to 5 MB.");

        var extension = Path.GetExtension(photo.FileName).ToLowerInvariant();
        var allowed = new Dictionary<string, (string Mime, byte[] Signature)>
        {
            [".jpg"] = ("image/jpeg", new byte[] { 0xFF, 0xD8, 0xFF }),
            [".jpeg"] = ("image/jpeg", new byte[] { 0xFF, 0xD8, 0xFF }),
            [".png"] = ("image/png", new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A }),
            [".webp"] = ("image/webp", new byte[] { 0x52, 0x49, 0x46, 0x46 })
        };
        if (!allowed.TryGetValue(extension, out var expected) || photo.ContentType != expected.Mime)
            return BadRequest("Only JPG, PNG and WebP images are supported.");

        await using var uploaded = photo.OpenReadStream();
        var header = new byte[12];
        var read = await uploaded.ReadAsync(header.AsMemory());
        bool signatureOk = read >= expected.Signature.Length &&
            header.AsSpan(0, expected.Signature.Length).SequenceEqual(expected.Signature) &&
            (extension != ".webp" || (read >= 12 && header.AsSpan(8, 4).SequenceEqual(new byte[] { 0x57, 0x45, 0x42, 0x50 })));
        if (!signatureOk) return BadRequest("Invalid image content.");

        // Save to wwwroot; the generated file name prevents path traversal / collisions.
        var webRoot = _environment.WebRootPath ?? Path.Combine(_environment.ContentRootPath, "wwwroot");
        var directory = Path.Combine(webRoot, "uploads", "photos");
        Directory.CreateDirectory(directory);
        var filename = $"{Guid.NewGuid():N}{extension}";
        var filePath = Path.Combine(directory, filename);
        await using (var output = System.IO.File.Create(filePath))
        {
            await output.WriteAsync(header.AsMemory(0, read));
            await uploaded.CopyToAsync(output);
        }

        var imageUrl = $"/uploads/photos/{filename}";
        try
        {
            await _service.CreatePhotoAsync(title.Trim(), imageUrl, description.Trim(), parsedCategory, userId.Value);
        }
        catch
        {
            System.IO.File.Delete(filePath);
            throw;
        }
        return Ok(new { message = "Photo uploaded successfully.", imageUrl });
    }

    [HttpDelete("{id:int}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeletePhoto(int id)
    {
        var userId = CurrentUserId();
        if (userId == null) return Unauthorized();
        if (id <= 0) return BadRequest("Invalid photo ID.");
        try
        {
            await _service.DeletePhotoAsync(id, userId.Value);
            return NoContent();
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }

    private int? CurrentUserId() =>
        int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) && id > 0 ? id : null;
}
