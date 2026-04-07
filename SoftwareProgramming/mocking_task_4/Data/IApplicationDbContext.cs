using Categories2024.Models;

namespace Categories2024.Data
{
    public interface IApplicationDbContext
    {
        IEnumerable<Category> Categories { get; }
        void AddCategory(Category category);
        int SaveChanges();
    }
}
