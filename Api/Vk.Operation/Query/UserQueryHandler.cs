using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Schema;

namespace Vk.Operation;

public class UserQueryHandler :
    IRequestHandler<GetAllUserQuery, ApiResponse<List<UserResponse>>>,
    IRequestHandler<GetUserByIdQuery, ApiResponse<UserResponse>>
{
    private readonly VkDbContext dbContext;
    private readonly IMapper mapper;

    public UserQueryHandler(VkDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }


    public async Task<ApiResponse<List<UserResponse>>> Handle(GetAllUserQuery request,
        CancellationToken cancellationToken)
    {
        List<User> list = await dbContext.Set<User>()
            .ToListAsync(cancellationToken);

        List<UserResponse> mapped = mapper.Map<List<UserResponse>>(list);
        return new ApiResponse<List<UserResponse>>(mapped);
    }

    public async Task<ApiResponse<UserResponse>> Handle(GetUserByIdQuery request,
        CancellationToken cancellationToken)
    {
        User? entity = await dbContext.Set<User>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
        {
            return new ApiResponse<UserResponse>("Record not found!");
        }

        UserResponse mapped = mapper.Map<UserResponse>(entity);
        return new ApiResponse<UserResponse>(mapped);
    }
}