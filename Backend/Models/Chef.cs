using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace RecipeNest.Models
{
    public class Chef
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Bio { get; set; }
        public string Speciality { get; set; }
        public byte[] Picture { get; set; }
        public string Password { get; set; }

        // Static method for hashing password using BCrypt
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password); // Hash password using BCrypt
        }
    }

    // Request model for updating Chef profile
    public class ChefProfileUpdateRequest
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Bio { get; set; }
        public string Speciality { get; set; }
        public IFormFile Picture { get; set; }  // Profile picture (uploaded image)
        public string Password { get; set; }  // Password for updating
    }
}
