namespace RecipeNest.Services
{
    public static class AuthService
    {
        // Hash the password
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password); // Hash the password using BCrypt
        }

        // Verify the password
        public static bool VerifyPassword(string hashedPassword, string enteredPassword)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, hashedPassword); // Verify password match
        }
    }
}
