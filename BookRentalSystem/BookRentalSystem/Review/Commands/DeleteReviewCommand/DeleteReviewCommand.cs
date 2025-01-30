using MediatR;

namespace BookRentalSystem.Review.Commands.DeleteReviewCommand;

public class DeleteReviewCommand : IRequest
{
    public int ReviewId { get; set; }

    public DeleteReviewCommand(int reviewId)
    {
        ReviewId = reviewId;
    }
}
