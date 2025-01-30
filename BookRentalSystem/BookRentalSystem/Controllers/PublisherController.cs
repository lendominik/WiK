using BookRentalSystem.Publisher.Commands.CreatePublisherCommand;
using BookRentalSystem.Publisher.Commands.DeletePublisherCommand;
using BookRentalSystem.Publisher.Commands.EditPublisherCommand;
using BookRentalSystem.Publisher.Queries.GetAllPublishersQuery;
using BookRentalSystem.Publisher.Queries.GetPublisherByIdQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookRentalSystem.Controllers;

[Route("api/v1/publisher")]
[ApiController]
public class PublisherController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var publishers = await mediator.Send(new GetAllPublishersQuery());
        return Ok(publishers);
    }

    [HttpGet("{publisherId}")]
    public async Task<IActionResult> GetPublisher([FromRoute]int publisherId)
    {
        var publisher = await mediator.Send(new GetPublisherByIdQuery(publisherId));
        return Ok(publisher);
    }

    [HttpDelete("{publisherId}")]
    public async Task<IActionResult> DeletePublisher([FromRoute]int publisherId)
    {
        await mediator.Send(new DeletePublisherCommand(publisherId));
        return Ok();
    }

    [HttpPut("{publisherId}")]
    public async Task<IActionResult> UpdatePublisher([FromRoute]int publisherId, [FromBody]EditPublisherCommand command)
    {
        await mediator.Send(command);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> AddPublisher([FromBody] CreatePublisherCommand command)
    {
        await mediator.Send(command);
        return Ok();
    }
}
