using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeNest.Data;
using RecipeNest.Models;
using RecipeNest.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RecipeNest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminAuthController : ControllerBase
    {
        private readonly RecipeDbContext _context;

        public AdminAuthController(RecipeDbContext context)
        {
            _context = context;
        }

        // POST: api/Auth/Login
        [HttpPost("adminlogin")]
        public async Task<ActionResult> AdminUserLogin([FromBody] LoginRequest request)
        {
            // Find the AdminUser by email
            var AdminUser = await _context.AdminUser.FirstOrDefaultAsync(c => c.Email == request.Email);
            if (AdminUser == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            // Verify the password
            if (!AuthService.VerifyPassword(AdminUser.PasswordHash, request.Password))
            {
                return Unauthorized("Invalid credentials.");
            }

            // Generate the JWT token for the AdminUser
            var token = GenerateJwtToken(AdminUser);

            // Return the token and AdminUserId in the response
            return Ok(new { Token = token, AdminUserId = AdminUser.Id });
        }

        // Generate JWT token for a AdminUser
        private string GenerateJwtToken(AdminUser AdminUser)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("nbhdyhfbdhydgdhbvdfFGABGSTEGHSYFER345A23D")); // 256-bit key
            var claims = new[] {
                new Claim(ClaimTypes.Email, AdminUser.Email),
                new Claim("Role", "AdminUser"),
                new Claim(ClaimTypes.NameIdentifier, AdminUser.Id.ToString())
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "RecipeNest",
                audience: "RecipeNest",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
