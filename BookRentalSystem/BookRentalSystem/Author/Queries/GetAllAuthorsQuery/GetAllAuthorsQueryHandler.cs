using AutoMapper;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Author.Queries.GetAllAuthorsQuery;

public class GetAllAuthorsQueryHandler(IGenericRepository<Core.Entities.Author> repository, IMapper mapper) : IRequestHandler<GetAllAuthorsQuery, IEnumerable<AuthorDto>>
{
    public async Task<IEnumerable<AuthorDto>> Handle(GetAllAuthorsQuery request, CancellationToken cancellationToken)
    {
        var authors = await repository.GetAll();

        return mapper.Map<IEnumerable<AuthorDto>>(authors);
    }
}
