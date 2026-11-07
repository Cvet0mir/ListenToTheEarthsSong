using ListenToTheEarthsSong.Core.Interfaces;
using ListenToTheEarthsSong.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListenToTheEarthsSong.Core.Services
{
    public class PhotoService : IPhotosService
    {
        public Task CreatePhotoAsync(string ImgName, string ImgUrl, int UserId)
        {
            throw new NotImplementedException();
        }

        public Task DeletePhotoAsync(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Photo>> GetAllPhotosAsync()
        {
            throw new NotImplementedException();
        }
    }
}
