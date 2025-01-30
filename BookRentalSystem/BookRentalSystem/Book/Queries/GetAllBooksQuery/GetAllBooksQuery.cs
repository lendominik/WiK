using MediatR;

namespace BookRentalSystem.Book.Queries.GetAllBooksQuery;

public class GetAllBooksQuery : IRequest<IEnumerable<BookDto>>
{

}
