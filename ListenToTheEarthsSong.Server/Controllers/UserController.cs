using ListenToTheEarthsSong.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

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


        [HttpPost("AuthenticateUser")]
        public async Task<IActionResult> AuthenticateUser(
            [FromForm] string email,
            [FromForm] string password)
        {
            if (string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(password))
            {
                return BadRequest("Имейлът и паролата са задължителни.");
            }

            try
            {
                var user = await Service.AuthenticateUserAsync(
                    email.Trim(),
                    password
                );

                if (user == null)
                {
                    return Unauthorized("Невалиден имейл адрес или парола.");
                }

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email)
                };

                var identity = new ClaimsIdentity(
                    claims,
                    CookieAuthenticationDefaults.AuthenticationScheme
                );

                var principal = new ClaimsPrincipal(identity);

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    principal
                );

                return Ok("Успешно влизане!");
            }
            catch (InvalidOperationException x)
            {
                return BadRequest(x.Message);
            }
        }


        [HttpGet("GetCurrentUser")]
        public IActionResult GetCurrentUser()
        {
            if (User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                username = User.Identity.Name,
                email = User.FindFirst(ClaimTypes.Email)?.Value
            });
        }


        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme
            );

            return Ok("Успешно излизане!");
        }
    }
}
