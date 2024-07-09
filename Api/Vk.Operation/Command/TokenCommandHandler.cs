using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Vk.Base;
using Vk.Base.Response;
using Vk.Base.Token;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Schema;

namespace Vk.Operation.Command;

public class TokenCommandHandler :
    IRequestHandler<CreateTokenCommand, ApiResponse<TokenResponse>>,
    IRequestHandler<DecodeTokenCommand, ApiResponse<int>>


{
    private readonly VkDbContext dbContext;
    private readonly JwtConfig jwtConfig;

    public TokenCommandHandler(VkDbContext dbContext, IOptionsMonitor<JwtConfig> jwtConfig)
    {
        this.dbContext = dbContext;
        this.jwtConfig = jwtConfig.CurrentValue;
    }


    public async Task<ApiResponse<TokenResponse>> Handle(CreateTokenCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await dbContext.Set<User>().FirstOrDefaultAsync(x => x.Email == request.Model.Email, cancellationToken);
        if (entity == null)
        {
            return new ApiResponse<TokenResponse>("Invalid user informations");
        }

        var md5 = Md5.Create(request.Model.Password);
        if (entity.Password != request.Model.Password)
        {
            entity.LastActivityDate = DateTime.UtcNow;
            await dbContext.SaveChangesAsync(cancellationToken);

            return new ApiResponse<TokenResponse>("Invalid user informations");
        }

        if (!entity.IsActive)
        {
            return new ApiResponse<TokenResponse>("Invalid user!");
        }

        string token = Token(entity);
        TokenResponse tokenResponse = new()
        {
            Token = token,
            ExpireDate = DateTime.Now.AddHours(jwtConfig.AccessTokenExpiration),
            Email = entity.Email
        };

        return new ApiResponse<TokenResponse>(tokenResponse);
    }

    private string Token(User user)
    {
        Claim[] claims = GetClaims(user);
        var secret = Encoding.ASCII.GetBytes(jwtConfig.Secret);

        var jwtToken = new JwtSecurityToken(
            jwtConfig.Issuer,
            jwtConfig.Audience,
            claims,
            expires: DateTime.Now.AddHours(jwtConfig.AccessTokenExpiration),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature)
        );

        string accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        return accessToken;
    }


    private Claim[] GetClaims(User customer)
    {
        var claims = new[]
        {
            new Claim("Id", customer.Id.ToString()),
            new Claim("Role", customer.Role),
            new Claim("Email", customer.Email),
            new Claim(ClaimTypes.Role, customer.Role),
            new Claim("FullName", $"{customer.FullName}")
        };

        return claims;
    }
    public Task<int> Handle(DecodeTokenCommand request, CancellationToken cancellationToken)
    {
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadToken(request.Token) as JwtSecurityToken;

        if (token == null)
        {
            // Token geçerli deðilse veya hatalýysa -1 dönebiliriz.
            return Task.FromResult(-1);
        }

        // Ýlgili JWT'den "Id" deðerini alýp int'e çeviriyoruz.
        if (int.TryParse(token.Claims.First(claim => claim.Type == "Id").Value, out int userId))
        {
            return Task.FromResult(userId);
        }

        // Eðer "Id" claim'i yoksa veya çevirme iþlemi baþarýsýz olursa -1 dönebiliriz.
        return Task.FromResult(-1);
    }

    Task<ApiResponse<int>> IRequestHandler<DecodeTokenCommand, ApiResponse<int>>.Handle(DecodeTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);

            tokenHandler.ValidateToken(request.Token, new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            if (validatedToken is JwtSecurityToken jwtSecurityToken)
            {
                if (jwtSecurityToken.Payload.TryGetValue("Id", out var id))
                {
                    if (int.TryParse(id.ToString(), out var customerId))
                    {
                        return Task.FromResult(new ApiResponse<int>(customerId));
                    }
                }
            }

            return Task.FromResult(new ApiResponse<int>("Token decoding failed"));
        }
        catch (Exception ex)
        {
            return Task.FromResult(new ApiResponse<int>("Token decoding failed: " + ex.Message));
        }
    }
}