using Categories2024.Models;
using Microsoft.EntityFrameworkCore;

namespace Categories2024.Data
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }

        IEnumerable<Category> IApplicationDbContext.Categories => Categories;

        public void AddCategory(Category category)
        {
            Categories.Add(category);
        }
    }
}
