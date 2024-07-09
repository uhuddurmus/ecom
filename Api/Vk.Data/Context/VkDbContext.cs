using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Vk.Data.Domain;

namespace Vk.Data.Context
{
    public class VkDbContext : DbContext
    {
        public VkDbContext(DbContextOptions<VkDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfigruration());
            modelBuilder.ApplyConfiguration(new ProductConfigruration());
            base.OnModelCreating(modelBuilder);
        }

        public void SeedData()
        {
            // Create Admin User if not exists
            if (!Users.Any(u => u.Email == "admin@gmail.com"))
            {
                Users.Add(new User
                {
                    Email = "admin@gmail.com",
                    Password = "12345", // Bu şifreyi güvenli bir şekilde hashlemenizi öneririm
                    FullName = "Admin Kullanıcı",
                    Role = "Admin",
                    LastActivityDate = DateTime.UtcNow,
                    PasswordRetryCount = 0,
                    InsertDate = DateTime.UtcNow,
                    IsActive = true
                });

                SaveChanges();
            }

            // Create random products if not exists
            if (!Products.Any())
            {
                var random = new Random();
                var productTypes = new[] { "Electronics", "Clothing", "Food", "Furniture", "Toys" };
                var productBrands = new[] { "BrandA", "BrandB", "BrandC", "BrandD", "BrandE" };
                var colors = new[] { "Red", "Blue", "Green", "Yellow", "Black" };

                for (int i = 1; i <= 100; i++)
                {
                    Products.Add(new Product
                    {
                        Name = $"Product {i}",
                        Description = $"Description for product {i}",
                        Price = random.Next(10, 1000),
                        PictureUrl = $"https://dummyjson.com/icon/{i}/150",
                        ProductType = productTypes[random.Next(productTypes.Length)],
                        ProductBrand = productBrands[random.Next(productBrands.Length)],
                        Color = colors[random.Next(colors.Length)],
                        Popularity = random.Next(1, 100),
                        InsertDate = DateTime.UtcNow,
                        IsActive = true
                    });
                }

                SaveChanges();
            }
        }
    }
}
