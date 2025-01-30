using MediatR;

namespace BookRentalSystem.Publisher.Commands.EditPublisherCommand;

public class EditPublisherCommand : IRequest
{
    public int PublisherId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
}
