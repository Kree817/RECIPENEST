using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeNest.Data;
using RecipeNest.Models;
using RecipeNest.Services;
using System.IO;
using System.Threading.Tasks;
using static RecipeNest.Models.Chef;

namespace RecipeNest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChefController : ControllerBase
    {
        private readonly RecipeDbContext _context;

        public ChefController(RecipeDbContext context)
        {
            _context = context;
        }

        // POST: api/Chef
        [HttpPost]
        public async Task<ActionResult<Chef>> PostChef([FromForm] ChefSignupRequest request)
        {
            // Check if required fields are provided
            if (string.IsNullOrEmpty(request.FullName) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Full Name, Email, and Password are required.");
            }

            // Convert picture to byte array if provided
            byte[] pictureBytes = null;
            if (request.Picture != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await request.Picture.CopyToAsync(memoryStream);
                    pictureBytes = memoryStream.ToArray();
                }
            }

            // Hash the password
            var chef = new Chef
            {
                FullName = request.FullName,
                Email = request.Email,
                Bio = request.Bio,
                Speciality = request.Speciality,
                Password = AuthService.HashPassword(request.Password),
                Picture = pictureBytes
            };

            // Check if chef already exists with the same email
            var existingChef = await _context.Chef.FirstOrDefaultAsync(c => c.Email == chef.Email);
            if (existingChef != null)
            {
                return Conflict("A chef with this email already exists.");
            }

            _context.Chef.Add(chef);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChef), new { id = chef.Id }, chef);
        }

        // GET: api/Chef/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Chef>> GetChef(int id)
        {
            var chef = await _context.Chef.FindAsync(id);

            if (chef == null)
                return NotFound();

            return chef;
        }

        // PUT: api/Chef/5
        [HttpPut("{id}")]
public async Task<IActionResult> UpdateChefProfile(int id, [FromForm] ChefProfileUpdateRequest request)
{
    var chef = await _context.Chef.FindAsync(id);
    if (chef == null)
    {
        return NotFound("Chef not found.");
    }

    // Update profile fields
    chef.FullName = request.FullName;
    chef.Email = request.Email;
    chef.Password = request.Password; // Hash the password if necessary
    chef.Bio = request.Bio;
    chef.Speciality = request.Speciality;

    if (request.Picture != null)
    {
        using (var ms = new MemoryStream())
        {
            await request.Picture.CopyToAsync(ms);
            chef.Picture = ms.ToArray(); // Save the picture as a byte array
        }
    }

    await _context.SaveChangesAsync();

    return NoContent(); // Return success
}


        // GET: api/Chef
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chef>>> GetAllChefs()
        {
            var chefs = await _context.Chef
                .Select(c => new
                {
                    c.Id,
                    c.FullName,
                    c.Email,
                    c.Bio,
                    c.Speciality,
                    Picture = c.Picture != null ? Convert.ToBase64String(c.Picture) : ""  // Convert byte[] to base64 if not null
                })
                .ToListAsync();

            return Ok(chefs);
        }

        // DELETE: api/Chef/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChef(int id)
        {
            var chef = await _context.Chef.FindAsync(id);
            if (chef == null)
                return NotFound();

            _context.Chef.Remove(chef);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChefExists(int id)
        {
            return _context.Chef.Any(e => e.Id == id);
        }

        private async Task<byte[]> ConvertToBytesAsync(IFormFile file)
        {
            if (file == null) return null;

            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
    }
}
