namespace Core.Entities;

public class Category : BaseEntity
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public virtual List<Book> Books { get; set; } = [];
}