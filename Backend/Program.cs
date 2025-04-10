using Microsoft.EntityFrameworkCore;
using RecipeNest.Data;
using RecipeNest.Models;

namespace RecipeNest
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 🔐 JWT Settings
            builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

            // ✅ Add DbContext (MySQL)
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<RecipeDbContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

            // ✅ Add Controllers
            builder.Services.AddControllers();

            // ✅ Add Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // ✅ Add CORS BEFORE building app
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins("http://localhost:5173") // your React/Vite app
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // ✅ Build the app AFTER all services are registered
            var app = builder.Build();

            // ✅ Enable Swagger only in development
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // ✅ Use middleware
            app.UseHttpsRedirection();
            app.UseCors("AllowFrontend"); // enable the CORS policy
            app.UseAuthorization();

            // ✅ Map controller routes
            app.MapControllers();

            app.Run();
        }
    }
}
