using ListenToTheEarthsSong.Data.Enums;
using ListenToTheEarthsSong.Data.Models;

namespace ListenToTheEarthsSong.Core.Interfaces;

public interface IPhotosService
{
    Task CreatePhotoAsync(string imgName, string imgUrl, string description, PhotoCategory category, int userId);
    Task DeletePhotoAsync(int id, int userId);
    Task<List<Photo>> GetAllPhotosAsync(DateTime? sortByDate);
}