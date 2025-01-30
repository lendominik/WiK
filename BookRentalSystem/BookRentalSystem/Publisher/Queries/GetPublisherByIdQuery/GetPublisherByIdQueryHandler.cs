using AutoMapper;
using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Publisher.Queries.GetPublisherByIdQuery;

public class GetPublisherByIdQueryHandler(
    IGenericRepository<Core.Entities.Publisher> repository,
    IMapper mapper)
    : IRequestHandler<GetPublisherByIdQuery, PublisherDto>
{
    public async Task<PublisherDto> Handle(GetPublisherByIdQuery request, CancellationToken cancellationToken)
    {
        var publisher = await repository.GetByIdAsync(request.PublisherId);

        if (publisher is null)
            throw new NotFoundException("Publisher not found");

        return mapper.Map<PublisherDto>(publisher);
    }
}
