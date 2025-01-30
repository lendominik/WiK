using MediatR;

namespace BookRentalSystem.Book.Commands.DeleteBookCommand;

public class DeleteBookCommand : IRequest
{
    public int BookId { get; set; }

    public DeleteBookCommand(int bookId)
    {
        BookId = bookId;
    }
}
