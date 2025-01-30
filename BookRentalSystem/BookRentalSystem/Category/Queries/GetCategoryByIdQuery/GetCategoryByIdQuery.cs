using MediatR;

namespace BookRentalSystem.Category.Queries.GetCategoryByIdQuery;

public class GetCategoryByIdQuery : IRequest<CategoryDto>
{
    public int CategoryId { get; set; }

    public GetCategoryByIdQuery(int categoryId)
    {
        CategoryId = categoryId;
    }
}
