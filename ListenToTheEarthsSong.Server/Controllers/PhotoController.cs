using ListenToTheEarthsSong.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ListenToTheEarthsSong.Server.Controllers
{
    public class PhotoController : Controller
    {
        private readonly IPhotosService Service;
        public PhotoController(IPhotosService service)
        {
            this.Service = service;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetAllPhotos(DateTime? sortByDate)
        {
            try
            {
                var photos = await Service.GetAllPhotosAsync(sortByDate);
                return Ok(photos);
            }
            catch (InvalidOperationException x)
            {
                return NotFound(x.Message);
            }
        }

        public async Task<IActionResult> DeletePhoto(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid photo ID.");
            }
            try
            {
                await Service.DeletePhotoAsync(id);
                return Ok("Photo deleted successfully.");
            }
            catch (InvalidOperationException x)
            {
                return NotFound(x.Message);
            }
        }

        public async Task<IActionResult> CreatePhoto(string ImgName, string ImgUrl, int UserId)
        {
            if (string.IsNullOrWhiteSpace(ImgName) || string.IsNullOrWhiteSpace(ImgUrl) || UserId <= 0)
            {
                return BadRequest("Image name, URL, and valid user ID are required.");
            }
            try
            {
                await Service.CreatePhotoAsync(ImgName, ImgUrl, UserId);
                return Ok("Photo created successfully.");
            }
            catch (InvalidOperationException x)
            {
                return BadRequest(x.Message);
            }
        }
    }
}
