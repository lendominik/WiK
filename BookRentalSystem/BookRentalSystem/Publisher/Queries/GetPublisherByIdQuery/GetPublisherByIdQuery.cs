using MediatR;

namespace BookRentalSystem.Publisher.Queries.GetPublisherByIdQuery;

public class GetPublisherByIdQuery : IRequest<PublisherDto>
{
    public int PublisherId { get; set; }

    public GetPublisherByIdQuery(int publisherId)
    {
        PublisherId = publisherId;
    }
}
