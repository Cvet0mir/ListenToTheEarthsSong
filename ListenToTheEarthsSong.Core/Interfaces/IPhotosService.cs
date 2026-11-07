using ListenToTheEarthsSong.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListenToTheEarthsSong.Core.Interfaces
{
    public interface IPhotosService
    {
        Task CreatePhotoAsync(string ImgName, string ImgUrl, int UserId);
        Task DeletePhotoAsync(int Id);
        Task<List<Photo>> GetAllPhotosAsync();
    }
}
