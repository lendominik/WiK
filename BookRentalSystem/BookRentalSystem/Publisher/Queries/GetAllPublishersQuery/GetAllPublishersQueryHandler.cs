using AutoMapper;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Publisher.Queries.GetAllPublishersQuery;

public class GetAllPublishersQueryHandler(
    IGenericRepository<Core.Entities.Publisher> repository,
    IMapper mapper)
    : IRequestHandler<GetAllPublishersQuery, IEnumerable<PublisherDto>>
{
    public async Task<IEnumerable<PublisherDto>> Handle(GetAllPublishersQuery request, CancellationToken cancellationToken)
    {
        var publishers = await repository.GetAll();

        return mapper.Map<IEnumerable<PublisherDto>>(publishers);
    }
}
