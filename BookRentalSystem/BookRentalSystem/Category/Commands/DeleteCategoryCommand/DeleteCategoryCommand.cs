using MediatR;

namespace BookRentalSystem.Category.Commands.DeleteCategoryCommand;

public class DeleteCategoryCommand : IRequest
{
    public int CategoryId { get; set; }

    public DeleteCategoryCommand(int categoryId)
    {
        CategoryId = categoryId;
    }
}
