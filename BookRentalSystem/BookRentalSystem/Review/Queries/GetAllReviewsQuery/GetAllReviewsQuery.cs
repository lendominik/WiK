using MediatR;

namespace BookRentalSystem.Review.Queries.GetAllReviewsQuery;

public class GetAllReviewsQuery : IRequest<IEnumerable<ReviewDto>>
{
}
