using AutoMapper;
using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using System.Threading;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Operation;
using Vk.Operation.Cqrs;
using Vk.Schema;


namespace VkApi.Controllers;


[Route("vk/api/v1/[controller]")]
[ApiController]
public class TokenController : ControllerBase
{
    private IMediator mediator;
    private readonly IConfiguration _configuration;
    private readonly VkDbContext dbContext;



    public TokenController(IMediator mediator, IConfiguration configuration)
    {
        this.mediator = mediator;
        _configuration = configuration;
        this.dbContext = dbContext;

    }


    [HttpPost]
    public async Task<ApiResponse<TokenResponse>> Post([FromBody] TokenRequest request)
    {
        var operation = new CreateTokenCommand(request);
        var result = await mediator.Send(operation);
        return result;
    }

    [HttpGet("getUserInfo")]
    [Authorize(Roles = "admin, user")]
    public async Task<ApiResponse<UserResponse>> GetUserInfo()
    {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        // Create a DecodeTokenCommand and send it to Mediator
        var decodeTokenCommand = new DecodeTokenCommand(token);
        var Id = await mediator.Send(decodeTokenCommand);
        var operation = new GetUserByIdQuery(Id.Response);
        var result = await mediator.Send(operation);
        return result;
    }



}