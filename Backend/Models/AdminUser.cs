﻿namespace RecipeNest.Models
{
    public class AdminUser
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
