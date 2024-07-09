using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Vk.Base.Response;
using Vk.Operation;
using Vk.Schema;

namespace VkApi.Controllers;

[Route("vk/api/v1/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private IMediator mediator;

    public UsersController(IMediator mediator)
    {
        this.mediator = mediator;
    }


    [HttpGet]
    [Authorize(Roles = "admin")]
    public async Task<ApiResponse<List<UserResponse>>> GetAll()
    {
        var operation = new GetAllUserQuery();
        var result = await mediator.Send(operation);
        return result;
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "admin")]

    public async Task<ApiResponse<UserResponse>> Get(int id)
    {
        var operation = new GetUserByIdQuery(id);
        var result = await mediator.Send(operation);
        return result;
    }

    [HttpPost]
    public async Task<ApiResponse<UserResponse>> Post([FromBody] UserRequest request)
    {
        request.Role = "user";
        var operation = new CreateUserCommand(request);
        var result = await mediator.Send(operation);
        return result;
    }

    [HttpPut("updateProfit")]
    [Authorize(Roles = "admin")]
    public async Task<ApiResponse> Post(int id, int profit)
    {
        var operation = new UpdateUserCommand(id, profit);
        var result = await mediator.Send(operation);
        return result;
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ApiResponse> Delete(int id)
    {
        var operation = new DeleteUserCommand(id);
        var result = await mediator.Send(operation);
        return result;
    }
}