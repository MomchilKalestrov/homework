using Microsoft.AspNetCore.Mvc;
using MVC.Data;
using MVC.Models;

namespace MVC.Controllers;

public class BookController : Controller
{
    // Injected via DI – gives access to the "Books" table
    private readonly ApplicationDbContext _db;

    public BookController(ApplicationDbContext db)
    {
        _db = db;
    }

    // Option 1 – Display the list of books (BookView.DisplayBooks)
    public IActionResult Index()
    {
        List<Book> books = _db.Books.ToList();
        return View(books);
    }

    // Option 2 – Show form to add a new book (BookView.GetNewBookDetails – GET)
    [HttpGet]
    public IActionResult Create()
    {
        return View();
    }

    // Option 2 – Process the submitted form and add the book (POST)
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create(string title, string author, int yearPublished)
    {
        if (!string.IsNullOrWhiteSpace(title) &&
            !string.IsNullOrWhiteSpace(author) &&
            yearPublished > 0)
        {
            _db.Books.Add(new Book(title, author, yearPublished));
            _db.SaveChanges();
        }

        // After adding, go back to the book list (Option 1)
        return RedirectToAction(nameof(Index));
    }

    // Option 3 – Show details of a single book (GET)
    [HttpGet]
    public IActionResult Details(int id)
    {
        Book? book = _db.Books.Find(id);
        if (book == null) return NotFound();
        return View(book);
    }

    // Option 4 – Show edit form for a book (GET)
    [HttpGet]
    public IActionResult Edit(int id)
    {
        Book? book = _db.Books.Find(id);
        if (book == null) return NotFound();
        return View(book);
    }

    // Option 4 – Process the edit form and update the book (POST)
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Edit(int id, string title, string author, int yearPublished)
    {
        Book? book = _db.Books.Find(id);
        if (book == null) return NotFound();

        if (!string.IsNullOrWhiteSpace(title) &&
            !string.IsNullOrWhiteSpace(author) &&
            yearPublished > 0)
        {
            book.Title = title;
            book.Author = author;
            book.YearPublished = yearPublished;
            _db.SaveChanges();
        }

        return RedirectToAction(nameof(Index));
    }

    // Option 5 – Show delete confirmation page (GET)
    [HttpGet]
    public IActionResult Delete(int id)
    {
        Book? book = _db.Books.Find(id);
        if (book == null) return NotFound();
        return View(book);
    }

    // Option 5 – Confirm and perform deletion (POST)
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public IActionResult DeleteConfirmed(int id)
    {
        Book? book = _db.Books.Find(id);
        if (book != null)
        {
            _db.Books.Remove(book);
            _db.SaveChanges();
        }

        return RedirectToAction(nameof(Index));
    }
}
