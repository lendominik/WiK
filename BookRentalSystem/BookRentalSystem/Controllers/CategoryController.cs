using BookRentalSystem.Category.Commands.CreateCategoryCommand;
using BookRentalSystem.Category.Commands.DeleteCategoryCommand;
using BookRentalSystem.Category.Commands.EditCategoryCommand;
using BookRentalSystem.Category.Queries.GetAllCategoriesQuery;
using BookRentalSystem.Category.Queries.GetCategoryByIdQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookRentalSystem.Controllers;

[Route("api/v1/category")]
[ApiController]
public class CategoryController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await mediator.Send(new GetAllCategoriesQuery());
        return Ok(categories);
    }

    [HttpGet("{categoryId}")]
    public async Task<IActionResult> GetCategory([FromRoute]int categoryId)
    {
        var category = await mediator.Send(new GetCategoryByIdQuery(categoryId));
        return Ok(category);
    }

    [HttpDelete("{categoryId}")]
    public async Task<IActionResult> DeleteCategory([FromRoute]int categoryId)
    {
        await mediator.Send(new DeleteCategoryCommand(categoryId));
        return Ok();
    }

    [HttpPut("{categoryId}")]
    public async Task<IActionResult> UpdateCategory([FromRoute]int categoryId, [FromBody]EditCategoryCommand command)
    {
        command.CategoryId = categoryId;
        await mediator.Send(command);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody]CreateCategoryCommand command)
    {
        await mediator.Send(command);
        return Ok();
    }
}
