namespace Recipenest.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public string Type { get; set; }
        public byte[] Picture { get; set; }  // Image stored as byte array
        public int ChefId { get; set; }
        public string PrepTime { get; set; }
        public string CookingTime { get; set; }
        public string PrepDescription { get; set; }
        public string CookingDescription { get; set; }
    }

    public class RecipeRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public string Type { get; set; }
        public IFormFile Picture { get; set; }  // For image upload
        public int ChefId { get; set; }
        public string PrepTime { get; set; }
        public string CookingTime { get; set; }
        public string PrepDescription { get; set; }
        public string CookingDescription { get; set; }
    }
}
