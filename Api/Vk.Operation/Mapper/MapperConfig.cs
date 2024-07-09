using AutoMapper;
using Vk.Data.Domain;
using Vk.Schema;

namespace Vk.Operation.Mapper;

public class MapperConfig : Profile
{
    public MapperConfig()
    {
        CreateMap<UserRequest, User>();
        CreateMap<User, UserResponse>();

        CreateMap<ProductRequest, Product>();
        CreateMap<Product, ProductResponse>();

    }
}