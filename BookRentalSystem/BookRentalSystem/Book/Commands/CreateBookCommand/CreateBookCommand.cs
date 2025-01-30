using MediatR;

namespace BookRentalSystem.Book.Commands.CreateBookCommand;

public class CreateBookCommand : BookDto, IRequest
{
}
