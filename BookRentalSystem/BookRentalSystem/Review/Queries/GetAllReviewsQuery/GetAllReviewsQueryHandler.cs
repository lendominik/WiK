using AutoMapper;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Review.Queries.GetAllReviewsQuery;

public class GetAllReviewsQueryHandler(
    IGenericRepository<Core.Entities.Review> repository,
    IMapper mapper)
    : IRequestHandler<GetAllReviewsQuery, IEnumerable<ReviewDto>>
{
    public async Task<IEnumerable<ReviewDto>> Handle(GetAllReviewsQuery request, CancellationToken cancellationToken)
    {
        var reviews = await repository.GetAll();

        return mapper.Map<IEnumerable<ReviewDto>>(reviews);
    }
}
