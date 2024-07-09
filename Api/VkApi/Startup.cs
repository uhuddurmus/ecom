using AutoMapper;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using StackExchange.Redis;
using System.Reflection;
using System.Text;
using Vk.Base.Logger;
using Vk.Base.Token;
using Vk.Data.Context;
using Vk.Data.Uow;
using Vk.Operation;
using Vk.Operation.Mapper;
using Vk.Operation.Validation;
using VkApi.Middleware;

namespace VkApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            string connection = Configuration.GetConnectionString("PgSqlConnection");
            services.AddDbContext<VkDbContext>(opts => opts.UseNpgsql(connection));

            var JwtConfig = Configuration.GetSection("JwtConfig").Get<JwtConfig>();
            services.Configure<JwtConfig>(Configuration.GetSection("JwtConfig"));

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddMediatR(typeof(CreateUserCommand).GetTypeInfo().Assembly);

            var config = new MapperConfiguration(cfg => { cfg.AddProfile(new MapperConfig()); });
            services.AddSingleton(config.CreateMapper());

            services.AddControllers().AddFluentValidation(x =>
            {
                x.RegisterValidatorsFromAssemblyContaining<BaseValidator>();
            });

            services.AddMemoryCache();

            // redis
            var redisConfig = new ConfigurationOptions();
            redisConfig.EndPoints.Add(Configuration["Redis:Host"], Convert.ToInt32(Configuration["Redis:Port"]));
            redisConfig.DefaultDatabase = 0;
            services.AddStackExchangeRedisCache(opt =>
            {
                opt.ConfigurationOptions = redisConfig;
                opt.InstanceName = Configuration["Redis:InstanceName"];
            });

            services.AddControllersWithViews(options =>
                options.CacheProfiles.Add("Cache100", new CacheProfile
                {
                    Duration = 100,
                    Location = ResponseCacheLocation.Any,
                }));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "VkApi", Version = "v1.0" });

                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "VkApi Management for IT Company",
                    Description = "Enter JWT Bearer token **_only_**",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };
                c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { securityScheme, new string[] { } }
                });
            });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://192.168.3.2:8080", "http://localhost:54565")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                    );
            });
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = JwtConfig.Issuer,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JwtConfig.Secret)),
                    ValidAudience = JwtConfig.Audience,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(60)
                };
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "VkApi v1"));
            }

            app.UseCors("CorsPolicy");
            app.UseMiddleware<ErrorHandlerMiddleware>();
            app.UseMiddleware<HeartBeatMiddleware>();
            Action<RequestProfilerModel> requestResponseHandler = requestProfilerModel =>
            {
                Log.Information("-------------Request-Begin------------");
                Log.Information(requestProfilerModel.Request);
                Log.Information(Environment.NewLine);
                Log.Information(requestProfilerModel.Response);
                Log.Information("-------------Request-End------------");
            };
            app.UseMiddleware<RequestLoggingMiddleware>(requestResponseHandler);

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });

            // Seed the database with initial data
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<VkDbContext>();
                context.SeedData();
            }
        }
    }
}
