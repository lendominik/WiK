using BookRentalSystem.Review.Commands.CreateReviewCommand;
using BookRentalSystem.Review.Commands.DeleteReviewCommand;
using BookRentalSystem.Review.Queries.GetAllReviewsQuery;
using BookRentalSystem.Review.Queries.GetReviewByIdQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookRentalSystem.Controllers;

[Route("api/v1/review")]
[ApiController]
public class ReviewController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var reviews = await mediator.Send(new GetAllReviewsQuery());
        return Ok(reviews);
    }

    [HttpGet("{reviewId}")]
    public async Task<IActionResult> GetReview([FromRoute]int reviewId)
    {
        var review = await mediator.Send(new GetReviewByIdQuery(reviewId));
        return Ok(review);
    }

    [HttpDelete("{reviewId}")]
    public async Task<IActionResult> DeleteReview([FromRoute]int reviewId)
    {
        await mediator.Send(new DeleteReviewCommand(reviewId));
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> AddReview([FromBody]CreateReviewCommand command)
    {
        await mediator.Send(command);
        return Ok();
    }
}
