using ListenToTheEarthsSong.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ListenToTheEarthsSong.Server.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserService Service;
        public UserController(IUserService service)
        {
            this.Service = service;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetUsers(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid user ID.");
            }

            try
            {
                var users = await Service.GetUserAsync(id);
                return Ok(users);
            }
            catch (InvalidOperationException x)
            {
                return NotFound(x.Message);
            }
        }

        public async Task<IActionResult> DeleteUser(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid user ID.");
            }
            try
            {
                await Service.DeleteUserAsync(id);
                return Ok("User deleted successfully.");
            }
            catch (InvalidOperationException x)
            {
                return NotFound(x.Message);
            }
        }

        public async Task<IActionResult> CreateUser(string username, string password, string email)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Username, password, and email are required.");
            }
            try
            {
                await Service.CreateUserAsync(username, password, email);
                return Ok("User created successfully.");
            }
            catch (InvalidOperationException x)
            {
                return BadRequest(x.Message);
            }
        }

        public async Task<IActionResult> AuthenticateUser(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                return BadRequest("Username and password are required.");
            }
            try
            {
                var isAuthenticated = await Service.AuthenticateUserAsync(username, password);
                if (isAuthenticated)
                    return Ok("User authenticated successfully.");
                else
                    return Unauthorized("Invalid username or password.");
            }
            catch (InvalidOperationException x)
            {
                return BadRequest(x.Message);
            }
        }
    }
}
