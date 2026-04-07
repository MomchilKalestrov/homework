using Microsoft.EntityFrameworkCore;
using MVC.Models;

namespace MVC.Data;

/// <summary>
/// Database context – represents a session with the database.
/// Each DbSet&lt;T&gt; maps to a table.
/// </summary>
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Maps to the "Books" table in the database
    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial data so the list is never empty on first run
        modelBuilder.Entity<Book>().HasData(
            new Book { Id = 1, Title = "The Great Gatsby",       Author = "F. Scott Fitzgerald", YearPublished = 1925 },
            new Book { Id = 2, Title = "To Kill a Mockingbird",  Author = "Harper Lee",          YearPublished = 1960 },
            new Book { Id = 3, Title = "1984",                   Author = "George Orwell",        YearPublished = 1949 }
        );
    }
}
