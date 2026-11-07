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
    public class UserService : IUserService
    {
        private readonly EarthDbContext _context;

        public UserService(EarthDbContext context)
        {
            _context = context;
        }

        public Task<bool> AuthenticateUserAsync(string username, string password)
        {
            throw new NotImplementedException();
        }

        public async Task CreateUserAsync(string username, string password, string email)
        {
            var userCheck = _context.Users;
            if(await userCheck.AnyAsync(x=>x.Username == username))
            {
                throw new InvalidOperationException("Username already exists.");
            }
            var hashPassword = PasswordHasher.ComputeSha256(password);
            if (await userCheck.AnyAsync(x=>x.PasswordHash == hashPassword))
            {
                throw new InvalidOperationException("Username already exists.");
            }

           await _context.Users.AddAsync(new User
            {
                Username = username,
                PasswordHash = hashPassword,
                Email = email
            });

           await _context.SaveChangesAsync();
            
        }

        public Task DeleteUserAsync(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
