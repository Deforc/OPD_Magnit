using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using WebApi1.Identity;

namespace WebApi1
{
    public class Program
    {
        internal const string ClientId = "ИмяПриложенияКоторомуМожноВыдатьТокен";
        internal const string ClientSecret = "ПарольПриложенияКоторомуМожноВыдатьТокен";
        internal const string Issuer = "Имя приложения";

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, o =>//Настройки проверки токена
                {
                    o.RequireHttpsMetadata = false;
                    o.IncludeErrorDetails = true;
                    o.SaveToken = true;
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = Issuer,
                        ValidateAudience = true,
                        ValidAudience = ClientId,
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,
                        RequireExpirationTime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ClientSecret)),
                    };
                });
            builder.Services
                .AddIdentityCore<User>(o =>
                {

                })
                .AddUserStore<UserStore>();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(o =>
            {
                var securityScheme = new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme.",
                    Name = "Authorization",
                    Scheme = "bearer",
                    Type = SecuritySchemeType.OAuth2,
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Flows = new()
                    {
                        Password = new()
                        {
                            TokenUrl = Uri.TryCreate("/api/token", UriKind.Relative, out var u) ? u : default,
                            Scopes = { { "Admin", "Administrator" }, { "User", "User" }, },
                        },
                    },
                };
                o.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securityScheme);
                securityScheme.Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = JwtBearerDefaults.AuthenticationScheme };
                o.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { securityScheme, new List<string>() }
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger(o =>
                {

                });
                app.UseSwaggerUI(o =>
                {
                    o.EnablePersistAuthorization();
                    o.OAuthScopeSeparator(" ");
                    o.OAuthClientId(ClientId);
                    o.OAuthClientSecret(ClientSecret);
                    o.OAuthScopes("Admin");
                    o.OAuthAppName("SwaggerIU");
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}