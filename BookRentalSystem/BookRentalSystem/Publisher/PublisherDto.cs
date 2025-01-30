using MediatR;

namespace BookRentalSystem.Publisher;

public class PublisherDto : IRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
}
