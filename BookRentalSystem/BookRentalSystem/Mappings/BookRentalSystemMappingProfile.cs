using AutoMapper;
using BookRentalSystem.Author;
using BookRentalSystem.Author.Commands.EditAuthorCommand;
using BookRentalSystem.Book;
using BookRentalSystem.Book.Commands.EditBookCommand;
using BookRentalSystem.Category;
using BookRentalSystem.Category.Commands.EditCategoryCommand;
using BookRentalSystem.Publisher;
using BookRentalSystem.Publisher.Commands.EditPublisherCommand;
using BookRentalSystem.Review;

namespace BookRentalSystem.Mappings;

public class BookRentalSystemMappingProfile : Profile
{
    public BookRentalSystemMappingProfile()
    {
        CreateMap<AuthorDto, Core.Entities.Author>().ReverseMap();
        CreateMap<ReviewDto, Core.Entities.Review>().ReverseMap();
        CreateMap<PublisherDto, Core.Entities.Publisher>().ReverseMap();
        CreateMap<BookDto, Core.Entities.Book>().ReverseMap();
        CreateMap<CategoryDto, Core.Entities.Category>().ReverseMap();

        CreateMap<EditCategoryCommand, Core.Entities.Category>();
        CreateMap<EditAuthorCommand, Core.Entities.Author>();
        CreateMap<EditPublisherCommand, Core.Entities.Publisher>();
        CreateMap<EditBookCommand, Core.Entities.Book>();
    }
}