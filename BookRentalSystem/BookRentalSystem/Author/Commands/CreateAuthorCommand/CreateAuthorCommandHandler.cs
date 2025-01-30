using AutoMapper;
using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Author.Commands.CreateAuthorCommand;

public class CreateAuthorCommandHandler(
    IGenericRepository<Core.Entities.Author> repository,
    IMapper mapper)
    : IRequestHandler<CreateAuthorCommand>
{
    public async Task Handle(CreateAuthorCommand request, CancellationToken cancellationToken)
    {
        var author = mapper.Map<Core.Entities.Author>(request);

        repository.Add(author);

        if (!await repository.SaveAllAsync())
            throw new BadRequestException("Problem creating author");
    }
}
