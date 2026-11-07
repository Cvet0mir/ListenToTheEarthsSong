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
        Task<bool> AuthenticateUserAsync(string username, string password);
        Task DeleteUserAsync(int Id);
    }
}
