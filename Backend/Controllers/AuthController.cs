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
    public class AuthController : ControllerBase
    {
        private readonly RecipeDbContext _context;

        public AuthController(RecipeDbContext context)
        {
            _context = context;
        }

        // POST: api/Auth/Login
        [HttpPost("login")]
        public async Task<ActionResult> ChefLogin([FromBody] LoginRequest request)
        {
            // Find the chef by email
            var chef = await _context.Chef.FirstOrDefaultAsync(c => c.Email == request.Email);
            if (chef == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            // Verify the password
            if (!AuthService.VerifyPassword(chef.Password, request.Password))
            {
                return Unauthorized("Invalid credentials.");
            }

            // Generate the JWT token for the chef
            var token = GenerateJwtToken(chef);

            // Return the token and chefId in the response
            return Ok(new { Token = token, ChefId = chef.Id });
        }

        // Generate JWT token for a chef
        private string GenerateJwtToken(Chef chef)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSuperSecretKeyThatIsAtLeast32BytesLong1234")); // 256-bit key
            var claims = new[] {
                new Claim(ClaimTypes.Name, chef.FullName),
                new Claim(ClaimTypes.Email, chef.Email),
                new Claim("Role", "Chef"),
                new Claim(ClaimTypes.NameIdentifier, chef.Id.ToString())
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
