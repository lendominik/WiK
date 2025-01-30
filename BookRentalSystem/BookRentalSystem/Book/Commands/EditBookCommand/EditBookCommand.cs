using MediatR;

namespace BookRentalSystem.Book.Commands.EditBookCommand;

public class EditBookCommand : IRequest
{
    public int BookId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set;}
}
