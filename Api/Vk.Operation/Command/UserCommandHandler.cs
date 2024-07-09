using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Vk.Base;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Schema;

namespace Vk.Operation.Command;

public class UserCommandHandler :
    IRequestHandler<CreateUserCommand, ApiResponse<UserResponse>>,
    IRequestHandler<DeleteUserCommand, ApiResponse>
{

    private readonly VkDbContext dbContext;
    private readonly IMapper mapper;

    public UserCommandHandler(VkDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }


    public async Task<ApiResponse<UserResponse>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        request.Model.Password = Md5.Create(request.Model.Password);
        User mapped = mapper.Map<User>(request.Model);

        var entity = await dbContext.Set<User>().AddAsync(mapped, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        var response = mapper.Map<UserResponse>(entity.Entity);
        return new ApiResponse<UserResponse>(response);
    }



    public async Task<ApiResponse> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Set<User>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (entity == null)
        {
            return new ApiResponse("Record not found!");
        }

        entity.IsActive = false;
        await dbContext.SaveChangesAsync(cancellationToken);
        return new ApiResponse();
    }

}