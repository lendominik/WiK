using MediatR;

namespace BookRentalSystem.Category.Queries.GetAllCategoriesQuery;

public class GetAllCategoriesQuery : IRequest<IEnumerable<CategoryDto>>
{
}
