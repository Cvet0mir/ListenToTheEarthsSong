using ListenToTheEarthsSong.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ListenToTheEarthsSong.Server.Controllers
{
    [Route("User")]
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


        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser(
            [FromForm] string username,
            [FromForm] string password,
            [FromForm] string email)
        {
            if (string.IsNullOrWhiteSpace(username) ||
                string.IsNullOrWhiteSpace(password) ||
                string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Всички полета са задължителни.");
            }

            if (username.Trim().Length < 3 || username.Trim().Length > 50)
            {
                return BadRequest("Потребителското име трябва да бъде между 3 и 50 символа.");
            }

            if (password.Length < 8)
            {
                return BadRequest("Паролата трябва да съдържа поне 8 символа.");
            }

            try
            {
                await Service.CreateUserAsync(
                    username.Trim(),
                    password,
                    email.Trim()
                );

                return Ok("Регистрацията е успешна!");
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
