using Categories2024.Controllers;
using Categories2024.Data;
using Categories2024.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace Categories2024.Tests;

public class HomeControllerTests
{
    private readonly Mock<ILogger<HomeController>> _loggerMock;
    private readonly Mock<IApplicationDbContext> _contextMock;

    public HomeControllerTests()
    {
        _loggerMock = new Mock<ILogger<HomeController>>();
        _contextMock = new Mock<IApplicationDbContext>();
    }

    [Fact]
    public void Index_ReturnsViewWithCategoriesModel()
    {
        var categories = new List<Category>
        {
            new() { Id = 1, Name = "Books", CategoryOrder = 1 },
            new() { Id = 2, Name = "Movies", CategoryOrder = 2 }
        };

        _contextMock.Setup(x => x.Categories).Returns(categories);
        var controller = new HomeController(_loggerMock.Object, _contextMock.Object);

        var result = controller.Index();

        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<IEnumerable<Category>>(viewResult.Model);
        Assert.Equal(2, model.Count());
    }

    [Fact]
    public void Create_Get_ReturnsViewResult()
    {
        var controller = new HomeController(_loggerMock.Object, _contextMock.Object);

        var result = controller.Create();

        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public void Create_Post_ValidCategory_AddsSavesAndRedirectsToIndex()
    {
        var category = new Category { Name = "Games", CategoryOrder = 3 };
        var controller = new HomeController(_loggerMock.Object, _contextMock.Object);

        var result = controller.Create(category);

        _contextMock.Verify(x => x.AddCategory(category), Times.Once);
        _contextMock.Verify(x => x.SaveChanges(), Times.Once);
        var redirect = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("Index", redirect.ActionName);
    }

    [Fact]
    public void Create_Post_NullCategory_DoesNotPersistAndRedirectsToIndex()
    {
        var controller = new HomeController(_loggerMock.Object, _contextMock.Object);

        var result = controller.Create(null);

        _contextMock.Verify(x => x.AddCategory(It.IsAny<Category>()), Times.Never);
        _contextMock.Verify(x => x.SaveChanges(), Times.Never);
        var redirect = Assert.IsType<RedirectToActionResult>(result);
        Assert.Equal("Index", redirect.ActionName);
    }
}