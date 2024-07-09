using MediatR;
using Vk.Base.Response;

namespace Vk.Operation.Cqrs;

public record CreateProductCommand(ProductRequest Model) : IRequest<ApiResponse<ProductResponse>>;
public record UpdateProductCommand(ProductRequest Model, int Id) : IRequest<ApiResponse>;
public record DeleteProductCommand(int Id) : IRequest<ApiResponse>;
public record GetAllProductQuery() : IRequest<ApiResponse<List<ProductResponse>>>;
public record GetProductByIdQuery(int Id) : IRequest<ApiResponse<ProductResponse>>;
public record GetProductByParametersQuery(string? ProductType, string? ProductBrand,string? Color, string? SortBy, string? Name) : IRequest<ApiResponse<List<ProductResponse>>>;
