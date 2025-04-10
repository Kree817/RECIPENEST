using RecipeNest.Data;
using RecipeNest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RecipeNest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChefController : ControllerBase
    {
        private readonly RecipeDbContext _context;
        private readonly IConfiguration _configuration;

        public ChefController(RecipeDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Models.LoginRequest request)
        {
            var user = await _context.Chef.FirstOrDefaultAsync(c => c.Email == request.Email);

            if (user == null || !user.VerifyPassword(request.Password))
                return Unauthorized("Invalid credentials");

            var secretKey = _configuration.GetSection("JwtSettings:SecretKey").Value;
            var token = user.GenerateJwtToken(secretKey);

            return Ok(new { token });
        }

        // GET: api/Chef
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chef>>> GetChef()
        {
            return await _context.Chef.ToListAsync();
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

        // POST: api/Chef
        [HttpPost]
        public async Task<ActionResult<Chef>> PostChef(Chef chef)
        {
            chef.Password = Chef.HashPassword(chef.Password);

            Console.WriteLine("🚀 Hashed Password: " + chef.Password);

            _context.Chef.Add(chef);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChef), new { id = chef.Id }, chef);
        }

        // PUT: api/Chef/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChef(int id, Chef chef)
        {
            if (id != chef.Id)
                return BadRequest();

            // Hash the password before updating
            chef.Password = Chef.HashPassword(chef.Password);

            _context.Entry(chef).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChefExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
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
    }
}
