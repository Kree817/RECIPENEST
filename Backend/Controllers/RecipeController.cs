using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Recipenest.Models;
using RecipeNest.Data;
using RecipeNest.Models;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Recipenest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly RecipeDbContext _context;

        public RecipeController(RecipeDbContext context)
        {
            _context = context;
        }

        // GET: api/Recipe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            return await _context.Recipes.ToListAsync();
        }

        // GET: api/Recipe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);

            if (recipe == null)
                return NotFound();

            return recipe;
        }

        // POST: api/Recipe
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe([FromForm] RecipeRequest request)
        {
            var recipe = new Recipe
            {
                Name = request.Name,
                Ingredients = request.Ingredients,
                Type = request.Type,
                PrepTime = request.PrepTime,   // Adding new field
                CookingTime = request.CookingTime,   // Adding new field
                PrepDescription = request.PrepDescription,  // Adding new field
                CookingDescription= request.PrepDescription,
                ChefId = request.ChefId,    // Adding new field
                Picture = await ConvertToBytesAsync(request.Picture)
            };

            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
        }

        // PUT: api/Recipe/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, [FromForm] RecipeRequest request)
        {
            if (id != request.Id)
                return BadRequest();

            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
                return NotFound();

            recipe.Name = request.Name;
            recipe.Ingredients = request.Ingredients;
            recipe.Type = request.Type;
            recipe.PrepTime = request.PrepTime;   // Updating the new field
            recipe.CookingTime = request.CookingTime;   // Updating the new field
            recipe.PrepDescription = request.PrepDescription;  // Updating the new field
            recipe.CookingDescription = request.CookingDescription;  // Updating the new field
            recipe.ChefId = request.ChefId;    // Updating the new field

            if (request.Picture != null)
            {
                recipe.Picture = await ConvertToBytesAsync(request.Picture);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Recipe/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
                return NotFound();

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return NoContent();
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

        private bool RecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.Id == id);
        }
    }
}
