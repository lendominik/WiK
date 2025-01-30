using AutoMapper;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Book.Queries.GetAllBooksQuery;

public class GetAllBooksQueryHandler(
    IGenericRepository<Core.Entities.Book> repository,
    IMapper mapper)
    : IRequestHandler<GetAllBooksQuery, IEnumerable<BookDto>>
{
    public async Task<IEnumerable<BookDto>> Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
    {
        var books = await repository.GetAll();

        return mapper.Map<IEnumerable<BookDto>>(books);
    }
}