using AutoMapper;
using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Book.Queries.GetBookByIdQuery;

public class GetBookByIdQueryHandler(
    IGenericRepository<Core.Entities.Book> repository,
    IMapper mapper)
    : IRequestHandler<GetBookByIdQuery, BookDto>
{
    public async Task<BookDto> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
    {
        var book = await repository.GetByIdAsync(request.BookId);

        if (book is null) 
            throw new NotFoundException("Book not found");

        return mapper.Map<BookDto>(book);
    }
}
