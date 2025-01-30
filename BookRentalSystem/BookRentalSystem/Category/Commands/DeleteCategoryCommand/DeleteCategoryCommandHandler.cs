using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Category.Commands.DeleteCategoryCommand;

public class DeleteCategoryCommandHandler(
    IGenericRepository<Core.Entities.Category> repository)
    : IRequestHandler<DeleteCategoryCommand>
{
    public async Task Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await repository.GetByIdAsync(request.CategoryId);

        if (category is null)
            throw new NotFoundException("Category not found");

        repository.Delete(category);

        if (!await repository.SaveAllAsync())
            throw new BadRequestException("Problem deleting the category");
    }
}
