﻿using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace RecipeNest.Models
{
    public class Chef
    {
        public int Id { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }   
        public string Password { get; set; }
        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

        // Verify input password with stored hash
        public bool VerifyPassword(string inputPassword)
        {
            var hashedInput = HashPassword(inputPassword);
            return hashedInput == Password;
        }

        // Generate JWT token (add key and expiry config as needed)
        public string GenerateJwtToken(string secretKey)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", Id.ToString()),
                    new Claim(ClaimTypes.Name, Fullname),
                    new Claim(ClaimTypes.Email, Email)
                }),
                Expires = DateTime.UtcNow.AddDays(1), // or shorter for more security
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
