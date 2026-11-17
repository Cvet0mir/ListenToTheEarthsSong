using ListenToTheEarthsSong.Core.Interfaces;
using ListenToTheEarthsSong.Data;
using ListenToTheEarthsSong.Data.Enums;
using ListenToTheEarthsSong.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ListenToTheEarthsSong.Core.Services;

public class PhotoService : IPhotosService
{
    private readonly EarthDbContext _context;
    public PhotoService(EarthDbContext context) => _context = context;

    public async Task CreatePhotoAsync(string imgName, string imgUrl, string description,
        PhotoCategory category, int userId)
    {
        if (!await _context.Users.AnyAsync(u => u.Id == userId))
            throw new InvalidOperationException("User does not exist.");

        if (await _context.Photos.AnyAsync(p => p.ImgUrl == imgUrl))
            throw new InvalidOperationException("Photo with this URL already exists.");

        _context.Photos.Add(new Photo
        {
            ImgName = imgName,
            ImgUrl = imgUrl,
            Description = description,
            Category = category,
            UploadedAt = DateTime.UtcNow,
            UploadedById = userId
        });
        await _context.SaveChangesAsync();
    }

    public async Task DeletePhotoAsync(int id, int userId)
    {
        var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id && p.UploadedById == userId);
        if (photo == null)
            throw new InvalidOperationException("Photo not found or you do not own it.");

        _context.Photos.Remove(photo);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Photo>> GetAllPhotosAsync(DateTime? sortByDate)
    {
        var query = _context.Photos.AsNoTracking().Include(p => p.UploadedBy).AsQueryable();
        if (sortByDate.HasValue)
        {
            var start = sortByDate.Value.Date;
            var end = start.AddDays(1);
            query = query.Where(p => p.UploadedAt >= start && p.UploadedAt < end);
        }
        return await query.OrderByDescending(p => p.UploadedAt).ToListAsync();
    }
}
