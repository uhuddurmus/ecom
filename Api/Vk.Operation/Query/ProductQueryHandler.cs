using AutoMapper;
using LinqKit;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Data.Uow;
using Vk.Operation.Cqrs;

namespace Vk.Operation;

public class ProductQueryHandler :
    IRequestHandler<GetAllProductQuery, ApiResponse<List<ProductResponse>>>,
    IRequestHandler<GetProductByIdQuery, ApiResponse<ProductResponse>>,
    IRequestHandler<GetProductByParametersQuery, ApiResponse<List<ProductResponse>>>

{
    private readonly VkDbContext dbContext;
    private readonly IMapper mapper;
    private readonly IUnitOfWork unitOfWork;

    public ProductQueryHandler(VkDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
        this.unitOfWork = unitOfWork;

    }


    public async Task<ApiResponse<List<ProductResponse>>> Handle(GetAllProductQuery request,
        CancellationToken cancellationToken)
    {
        List<Product> list = await dbContext.Set<Product>()
            .OrderByDescending(x => x.Popularity) // Popularity'ye göre descending sıralama eklendi
            .ToListAsync(cancellationToken);

        List<ProductResponse> mapped = mapper.Map<List<ProductResponse>>(list);
        return new ApiResponse<List<ProductResponse>>(mapped);
    }

    public async Task<ApiResponse<ProductResponse>> Handle(GetProductByIdQuery request,
        CancellationToken cancellationToken)
    {
        Product? entity = await dbContext.Set<Product>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
        {
            return new ApiResponse<ProductResponse>("Record not found!");
        }

        ProductResponse mapped = mapper.Map<ProductResponse>(entity);
        return new ApiResponse<ProductResponse>(mapped);
    }

    public async Task<ApiResponse<List<ProductResponse>>> Handle(GetProductByParametersQuery request, CancellationToken cancellationToken)
    {
        var predicate = PredicateBuilder.New<Product>(true);

        if (!string.IsNullOrWhiteSpace(request.ProductBrand))
            predicate.And(x => x.ProductBrand.Contains(request.ProductBrand));
        if (!string.IsNullOrWhiteSpace(request.ProductType))
            predicate.And(x => x.ProductType.Contains(request.ProductType));
        if (!string.IsNullOrWhiteSpace(request.Color))
            predicate.And(x => x.Color.Contains(request.Color));
        if (!string.IsNullOrWhiteSpace(request.Name))
        {
            var nameFilter = request.Name.Trim().ToLower();
            predicate.And(x => x.Name.ToLower().Contains(nameFilter));
        }
        var query = dbContext.Set<Product>().Where(predicate);

        // Sıralama işlemi
        switch (request.SortBy)
        {
            case "PriceAsc":
                query = query.OrderBy(x => x.Price);
                break;
            case "PriceDesc":
                query = query.OrderByDescending(x => x.Price);
                break;
            case "PopularityAsc":
                query = query.OrderBy(x => x.Popularity);
                break;
            case "PopularityDesc":
                query = query.OrderByDescending(x => x.Popularity);
                break;
            case "NameAsc":
                query = query.OrderBy(x => x.Name);
                break;
            case "NameDesc":
                query = query.OrderByDescending(x => x.Name);
                break;
            default:
                // Varsayılan sıralama
                query = query.OrderBy(x => x.Id); // Örneğin, Id'ye göre sırala
                break;
        }

        var list = await query.ToListAsync(cancellationToken);

        // Daha sonra hesaplama ve mapping işlemleri...

        var mapped = mapper.Map<List<ProductResponse>>(list);

        return new ApiResponse<List<ProductResponse>>(mapped);
    }
}