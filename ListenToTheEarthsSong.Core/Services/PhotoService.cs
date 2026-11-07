using ListenToTheEarthsSong.Core.Interfaces;
using ListenToTheEarthsSong.Data;
using ListenToTheEarthsSong.Data.Helpers;
using ListenToTheEarthsSong.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListenToTheEarthsSong.Core.Services
{
    public class PhotoService : IPhotosService
    {
        private readonly EarthDbContext _context;
        public PhotoService(EarthDbContext context)
        {
            _context = context;
        }

        public async Task CreatePhotoAsync(string ImgName, string ImgUrl, int UserId)
        {
            var userCheck = _context.Photos;

            if (await userCheck.AnyAsync(x => x.ImgUrl == ImgUrl))
            {
                throw new InvalidOperationException("Photo with this URL already exists.");
            }

            if (!await _context.Users.AnyAsync(x => x.Id == UserId))
            {
                throw new InvalidOperationException("User does not exist.");
            }

            await _context.Photos.AddAsync(new Photo
            {
                ImgName = ImgName,
                ImgUrl = ImgUrl,
                UploadedAt = DateTime.UtcNow,
                UploadedById = UserId
            });

            await _context.SaveChangesAsync();
        }

        public async Task DeletePhotoAsync(int Id)
        {
            var findPhoto = await _context.Photos.FindAsync(Id);

            if (findPhoto == null)
            {
                throw new InvalidOperationException("This photo does not exist.");
            }

            _context.Photos.Remove(findPhoto);

            await _context.SaveChangesAsync();
        }

        public async Task<List<Photo>> GetAllPhotosAsync(DateTime? sortByDate)
        {
            if (sortByDate.HasValue)
            {
                return await _context.Photos
                    .Where(p => p.UploadedAt.Date == sortByDate.Value.Date)
                    .ToListAsync();
            }
            return await _context.Photos.ToListAsync();
        }
    }
}
