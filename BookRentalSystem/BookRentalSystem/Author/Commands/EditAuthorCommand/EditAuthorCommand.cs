using MediatR;

namespace BookRentalSystem.Author.Commands.EditAuthorCommand;

public class EditAuthorCommand : AuthorDto, IRequest
{
    public int AuthorId { get; set; }
}
