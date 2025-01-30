using AutoMapper;
using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Category.Queries.GetCategoryByIdQuery;

public class GetCategoryByIdQueryHandler(
    IGenericRepository<Core.Entities.Category> repository,
    IMapper mapper)
    : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
{
    public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
    {
        var category = await repository.GetByIdAsync(request.CategoryId);

        if (category is null)
            throw new NotFoundException("Category not found");

        return mapper.Map<CategoryDto>(category);
    }
}
