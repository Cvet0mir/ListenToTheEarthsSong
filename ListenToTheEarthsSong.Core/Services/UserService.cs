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

        public async Task<User?> AuthenticateUserAsync(string email, string password)
        {
            var checkUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email);

            if (checkUser == null)
            {
                return null;
            }

            string hashPassword = PasswordHasher.ComputeSha256(password);
            if (checkUser.PasswordHash != hashPassword)
            {
                return null;
            }

            return checkUser;
        }

        public async Task CreateUserAsync(string username, string password, string email)
        {
            var userCheck = _context.Users;
            if(await userCheck.AnyAsync(x=>x.Username == username))
            {
                throw new InvalidOperationException("Username already exists.");
            }
            var hashPassword = PasswordHasher.ComputeSha256(password);

            if (await userCheck.AnyAsync(x => x.Email == email))
            {
                throw new InvalidOperationException("Email already exists.");
            }
            await _context.Users.AddAsync(new User
            {
                Username = username,
                PasswordHash = hashPassword,
                Email = email
            });

           await _context.SaveChangesAsync();
            
        }

        public async Task DeleteUserAsync(int Id)
        {
            var findUser = await _context.Users.FindAsync(Id);

            if (findUser==null)
            {
                throw new InvalidOperationException("This user does not exist.");
            }

            _context.Users.Remove(findUser);

            await _context.SaveChangesAsync();
        }

        public async Task<User> GetUserAsync(int Id)
        {
            var findUser = await _context.Users.FindAsync(Id);
            if (findUser == null)
            {
                throw new InvalidOperationException("This user does not exist.");
            }
            return findUser;
        }
    }
}  