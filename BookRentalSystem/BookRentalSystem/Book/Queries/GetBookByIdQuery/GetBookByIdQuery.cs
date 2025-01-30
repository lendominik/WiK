using MediatR;

namespace BookRentalSystem.Book.Queries.GetBookByIdQuery;

public class GetBookByIdQuery : IRequest<BookDto>
{
    public int BookId { get; set; }

    public GetBookByIdQuery(int bookId)
    {
        BookId = bookId;
    }
}
