using Microsoft.AspNetCore.Http;

namespace RecipeNest.Models
{
    public class ChefSignupRequest
    {
        // Chef's properties
        public int Id { get; set; }  // If this is needed for updating the chef's info

        // Required properties
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // Optional fields (but needed for chef signup)
        public string Bio { get; set; }
        public string Speciality { get; set; }

        // Profile picture
        public IFormFile Picture { get; set; }  // Picture as IFormFile for file uploads
    }
}
