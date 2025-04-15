using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeNest.Data;
using RecipeNest.Models;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace RecipeNest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly RecipeDbContext _context;

        public BlogController(RecipeDbContext context)
        {
            _context = context;
        }

        // GET: api/blog
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChefBlog>>> GetChefBlogs()
        {
            var chefBlogs = await _context.ChefBlogs.ToListAsync();
            return Ok(chefBlogs); // Return all chef blogs
        }

        // GET: api/blog/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChefBlog>> GetChefBlog(int id)
        {
            var blog = await _context.ChefBlogs.FindAsync(id);

            if (blog == null)
            {
                return NotFound(); // If the blog is not found, return 404
            }

            return blog; // Return the specific Chef blog
        }

        // POST: api/blog
        [HttpPost]
        public async Task<ActionResult<ChefBlog>> CreateChefBlog(
            [FromForm] ChefBlogRequest request)
        {
            if (request.Image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    // Convert image to byte array
                    await request.Image.CopyToAsync(memoryStream);
                    var chefBlog = new ChefBlog
                    {
                        Title = request.Title,
                        Content = request.Content,
                        Tag = request.Tag,
                        AuthorId = request.AuthorId,
                        Image = memoryStream.ToArray() // Store image as byte array
                    };

                    _context.ChefBlogs.Add(chefBlog);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction(nameof(GetChefBlog), new { id = chefBlog.Id }, chefBlog);
                }
            }

            return BadRequest("Image is required.");
        }

        // DELETE: api/blog/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChefBlog(int id)
        {
            var blog = await _context.ChefBlogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            _context.ChefBlogs.Remove(blog);
            await _context.SaveChangesAsync();

            return NoContent(); // Successful deletion response
        }
    }
}
