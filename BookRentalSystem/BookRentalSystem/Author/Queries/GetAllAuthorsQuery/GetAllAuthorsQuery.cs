using MediatR;

namespace BookRentalSystem.Author.Queries.GetAllAuthorsQuery;

public class GetAllAuthorsQuery : IRequest<IEnumerable<AuthorDto>>
{
}
