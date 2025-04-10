namespace RecipeNest.Models
{

    public class RecipeRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public string Type { get; set; }
        public IFormFile Picture { get; set; }
    }
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public string Type { get; set; }
        public byte[] Picture { get; set; }
    }
}
