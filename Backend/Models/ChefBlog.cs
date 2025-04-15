using System.ComponentModel.DataAnnotations;

namespace RecipeNest.Models
{
    public class ChefBlog
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public string Tag { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public int AuthorId { get; set; }

        // Image stored as byte array
        public byte[] Image { get; set; }
    }

    public class ChefBlogRequest
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public string Tag { get; set; }

        public int AuthorId { get; set; }

        // Image uploaded as IFormFile (for handling file upload)
        public IFormFile Image { get; set; }
    }
}
