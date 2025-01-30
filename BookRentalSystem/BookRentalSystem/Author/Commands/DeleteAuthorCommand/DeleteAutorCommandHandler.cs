using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Author.Commands.DeleteAuthorCommand;

public class DeleteAutorCommandHandler(
    IGenericRepository<Core.Entities.Author> repository)
    : IRequestHandler<DeleteAuthorCommand>
{
    public async Task Handle(DeleteAuthorCommand request, CancellationToken cancellationToken)
    {
        var author = await repository.GetByIdAsync(request.AuthorId);

        if (author is null)
            throw new NotFoundException("Author not found");

        repository.Delete(author);

        if (!await repository.SaveAllAsync())
            throw new BadRequestException("Problem deleting the author");
    }
}
