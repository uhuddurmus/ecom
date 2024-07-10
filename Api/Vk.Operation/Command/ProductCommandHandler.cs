using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Operation.Cqrs;

namespace Vk.Operation.Command;

public class ProductCommandHandler :
    IRequestHandler<CreateProductCommand, ApiResponse<ProductResponse>>,
    IRequestHandler<UpdateProductCommand, ApiResponse>,
    IRequestHandler<DeleteProductCommand, ApiResponse>

{
    private readonly VkDbContext dbContext;
    private readonly IMapper mapper;

    public ProductCommandHandler(VkDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }


    public async Task<ApiResponse<ProductResponse>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        Product mapped = mapper.Map<Product>(request.Model);

        var entity = await dbContext.Set<Product>().AddAsync(mapped, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        var response = mapper.Map<ProductResponse>(entity.Entity);
        return new ApiResponse<ProductResponse>(response);
    }

    public async Task<ApiResponse> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Set<Product>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (entity == null)
        {
            return new ApiResponse("Record not found!");
        }
        entity.Name = request.Model.Name;
        entity.Description = request.Model.Description;
        entity.Price = request.Model.Price;
        entity.PictureUrl = request.Model.PictureUrl;
        entity.ProductType = request.Model.ProductType;
        entity.ProductBrand = request.Model.ProductBrand;
        entity.Color = request.Model.Color;
        entity.Popularity = request.Model.Popularity;

        await dbContext.SaveChangesAsync(cancellationToken);
        return new ApiResponse();
    }




    public async Task<ApiResponse> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Set<Product>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (entity == null)
        {
            return new ApiResponse("Record not found!");
        }

        dbContext.Set<Product>().Remove(entity);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new ApiResponse();
    }
}