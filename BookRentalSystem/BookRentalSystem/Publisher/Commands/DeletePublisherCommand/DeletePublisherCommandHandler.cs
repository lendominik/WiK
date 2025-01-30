using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Publisher.Commands.DeletePublisherCommand;

public class DeletePublisherCommandHandler(
    IGenericRepository<Core.Entities.Publisher> repository)
    : IRequestHandler<DeletePublisherCommand>
{
    public async Task Handle(DeletePublisherCommand request, CancellationToken cancellationToken)
    {
        var publisher = await repository.GetByIdAsync(request.PublisherId);

        if (publisher is null) 
            throw new NotFoundException("Publisher not found");

        repository.Delete(publisher);

        if (!await repository.SaveAllAsync())
        {
            throw new BadRequestException("Problem deleting the publisher");
        }
    }
}
