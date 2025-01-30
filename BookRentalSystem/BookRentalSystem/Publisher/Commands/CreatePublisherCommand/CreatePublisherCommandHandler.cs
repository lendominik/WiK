using AutoMapper;
using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Publisher.Commands.CreatePublisherCommand;

public class CreatePublisherCommandHandler(
    IGenericRepository<Core.Entities.Publisher> repository,
    IMapper mapper)
    : IRequestHandler<CreatePublisherCommand>
{
    public async Task Handle(CreatePublisherCommand request, CancellationToken cancellationToken)
    {
        var publisher = mapper.Map<Core.Entities.Publisher>(request);

        repository.Add(publisher);

        if (!await repository.SaveAllAsync())
        {
            throw new BadRequestException("Problem creating publisher");
        }
    }
}
