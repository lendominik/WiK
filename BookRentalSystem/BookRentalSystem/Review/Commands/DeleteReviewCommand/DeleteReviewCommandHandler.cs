using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Review.Commands.DeleteReviewCommand;

public class DeleteReviewCommandHandler(
    IGenericRepository<Core.Entities.Review> repository)
    : IRequestHandler<DeleteReviewCommand>
{
    public async Task Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
    {
        var review = await repository.GetByIdAsync(request.ReviewId);

        if (review is null)
            throw new NotFoundException("Review not found");

        repository.Delete(review);

        if (!await repository.SaveAllAsync())
            throw new BadRequestException("Problem deleting the review");
    }
}
