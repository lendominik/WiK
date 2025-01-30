using AutoMapper;
using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Review.Queries.GetReviewByIdQuery;

public class GetReviewByIdQueryHandler(
    IGenericRepository<Core.Entities.Review> repository,
    IMapper mapper)
    : IRequestHandler<GetReviewByIdQuery, ReviewDto>
{
    public async Task<ReviewDto> Handle(GetReviewByIdQuery request, CancellationToken cancellationToken)
    {
        var review = await repository.GetByIdAsync(request.ReviewId);

        if (review is null)
            throw new NotFoundException("Review not found");

        return mapper.Map<ReviewDto>(review);
    }
}
