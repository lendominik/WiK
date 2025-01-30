using MediatR;

namespace BookRentalSystem.Publisher.Queries.GetAllPublishersQuery;

public class GetAllPublishersQuery : IRequest<IEnumerable<PublisherDto>>
{
}
