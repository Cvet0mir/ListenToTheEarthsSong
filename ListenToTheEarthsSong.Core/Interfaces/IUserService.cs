using ListenToTheEarthsSong.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListenToTheEarthsSong.Core.Interfaces
{
    public interface IUserService
    {
        Task CreateUserAsync(string username, string password, string email);
        Task<User?> AuthenticateUserAsync(string email, string password);
        Task DeleteUserAsync(int Id);
        Task<User> GetUserAsync(int Id);
    }
}
