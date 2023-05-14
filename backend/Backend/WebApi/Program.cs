using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using WebApi1.Data;

namespace WebApi1
{
    public class Program
    {
        internal const string ClientId = "Magnit";
        internal const string ClientSecret = "OPDagdsgsdfhsdhsdfhshfd";
        internal const string Issuer = "Имя приложения";
        public static void Main(string[] args)
        {
            var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
                {
                    options.AddPolicy(myAllowSpecificOrigins, policy =>
                    {
                        policy.WithOrigins(
                                "http://example.com",
                                "http://www.contoso.com")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin();
                    });
                }
                );
            // Add services to the container.
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 32))));

            builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole>()
                //.AddRoleManager<RoleStore<IdentityRole>>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

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
                using (var scope = app.Services.CreateScope())
                {
                    var scopedProvider = scope.ServiceProvider;
                    try
                    {
                        var storageContext = scopedProvider.GetRequiredService<ApplicationDbContext>();
                        ApplicationDbContextSeed.Seed(storageContext, app.Logger, scopedProvider.GetRequiredService<IPasswordHasher<IdentityUser>>(), 3);
                    }
                    catch (Exception ex)
                    {
                        app.Logger.LogError(ex, "An error occurred seeding the DB.");
                        throw;
                    }
                }

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

            app.UseCors(myAllowSpecificOrigins);
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}