using AutoMapper;
using BookRentalSystem.Exceptions;
using Core.Contracts;
using MediatR;

namespace BookRentalSystem.Review.Commands.CreateReviewCommand;

public class CreateReviewCommandHandler(
    IUnitOfWork unitOfWork,
    IMapper mapper)
    : IRequestHandler<CreateReviewCommand>
{
    public async Task Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
        var bookExists = unitOfWork.Repository<Core.Entities.Book>().Exists(request.BookId);

        if (!bookExists) 
            throw new NotFoundException("Book not found");

        var review = mapper.Map<Core.Entities.Review>(request);

        unitOfWork.Repository<Core.Entities.Review>().Add(review);

        if (!await unitOfWork.Repository<Core.Entities.Book>().SaveAllAsync())
            throw new BadRequestException("Problem creating review");
    }
}
