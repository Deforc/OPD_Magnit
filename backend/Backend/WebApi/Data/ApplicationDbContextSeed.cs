using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace WebApi1.Data
{
    public static class ApplicationDbContextSeed
    {
        public static void Seed(ApplicationDbContext catalogContext, ILogger logger, IPasswordHasher<IdentityUser> hasher, int retry = 0)
        {
            var retryForAvailability = retry;
            try
            {
                if (catalogContext.Database.IsRelational())
                {
                    catalogContext.Database.Migrate();
                }

                var role = catalogContext.Roles.FirstOrDefault(u => u.Id == "admin");
                if (role == null)
                {
                    role = catalogContext.Roles.Add(new()
                    {
                        Id = "admin",
                        Name = "admin",
                        NormalizedName = "admin",
                    }).Entity;
                    catalogContext.SaveChanges();
                }
                var user = catalogContext.Users.FirstOrDefault(u => u.UserName == "admin");
                if (user is null)
                {
                    user = catalogContext.Users.Add(new()
                    {
                        Id = "admin",
                        UserName = "admin",
                        NormalizedUserName = "admin",
                    }).Entity;
                    user.PasswordHash = hasher.HashPassword(user, "admin");
                    catalogContext.SaveChanges();
                }
                if (!catalogContext.UserRoles.Any() && user != null && role != null)
                {
                    catalogContext.UserRoles.Add(new()
                    {
                        RoleId = role.Id,
                        UserId = user.Id,
                    });
                    catalogContext.SaveChanges();
                }

                user = catalogContext.Users.FirstOrDefault(u => u.UserName == "user");
                if (user is null)
                {
                    user = catalogContext.Users.Add(new()
                    {
                        Id = "user",
                        UserName = "user",
                        NormalizedUserName = "user",
                    }).Entity;
                    user.PasswordHash = hasher.HashPassword(user, "user");
                    catalogContext.SaveChanges();
                }
                
                if (!catalogContext.UserRoles.Any() && user != null && role != null)
                {
                    catalogContext.UserRoles.Add(new()
                    {
                        RoleId = role.Id,
                        UserId = user.Id,
                    });
                    catalogContext.SaveChanges();
                }

                var map = catalogContext.Maps.FirstOrDefault(m => m.Id == 1);
                if (map is null)
                {
                    map = catalogContext.Maps.Add(new()
                    {
                        Id = 1,
                        City = "Город",
                        Street = "Улица ",
                        House = "Дом",
                        Building="Строение",
                        Floor="Этаж",
                        IsMap = true,
                        Json = "{\"key\":\"value\"}"
                    }).Entity;
                    catalogContext.SaveChanges();
                }

                var mapUser = catalogContext
                    .MapUsers
                    .FirstOrDefault(u => u.MapId == 1 && u.IdentityUserId == "admin");
                if (mapUser is null)
                {
                    mapUser = catalogContext.MapUsers.Add(new()
                    {
                        MapId = 1,
                        IdentityUserId = "admin"
                    }).Entity;
                    catalogContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                if (retryForAvailability >= 10) throw;

                retryForAvailability++;

                logger.LogError(ex.Message);
                Seed(catalogContext, logger, hasher, retryForAvailability);
                throw;
            }
        }


    }
}
