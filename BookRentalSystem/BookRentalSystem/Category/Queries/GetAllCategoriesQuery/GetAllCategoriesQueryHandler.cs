using AutoMapper;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Category.Queries.GetAllCategoriesQuery;

public class GetAllCategoriesQueryHandler(
    IGenericRepository<Core.Entities.Category> repository,
    IMapper mapper)
    : IRequestHandler<GetAllCategoriesQuery, IEnumerable<CategoryDto>>
{
    public async Task<IEnumerable<CategoryDto>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await repository.GetAll();

        return mapper.Map<IEnumerable<CategoryDto>>(categories);
    }
}
