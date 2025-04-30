using Microsoft.EntityFrameworkCore;
using RecipeNest.Models;
using BCrypt.Net;
using RecipeNest.Data;

namespace RecipeNest.Services
{
    public class AdminAuthService
    {
        private readonly RecipeDbContext _context;

        public AdminAuthService(RecipeDbContext context)
        {
            _context = context;
        }

        // Verify the admin credentials
        public bool VerifyAdmin(string email, string password)
        {
            var admin = _context.AdminUser.FirstOrDefault(a => a.Email == email);

            if (admin == null)
                return false;

            return BCrypt.Net.BCrypt.Verify(password, admin.PasswordHash); // Verifying the password hash

        }
    }
}
