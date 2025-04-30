using RecipeNest.Models;
using Microsoft.EntityFrameworkCore;
using Recipenest.Models;

namespace RecipeNest.Data
{
    public class RecipeDbContext : DbContext
    {
        public RecipeDbContext(DbContextOptions<RecipeDbContext> options)
            : base(options)
        {
        }

        // Define your DbSets (tables) here
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Chef> Chef { get; set; }
        public DbSet<ChefBlog> ChefBlogs { get; set; }
        public DbSet<AdminUser> AdminUser { get; set; }

    }
}
