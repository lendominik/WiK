namespace Core.Entities;

public class Book : BaseEntity
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }

    public int CategoryId { get; set; }
    public virtual Category Category { get; set; } = null!;

    public int AuthorId { get; set; }
    public virtual Author Author { get; set; } = null!;

    public int PublisherId { get; set; }
    public virtual Publisher Publisher { get; set; } = null!;

    public virtual List<Review> Reviews { get; set; } = [];
}