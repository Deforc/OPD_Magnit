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
                //задаю нового пользователя 
               
                user = catalogContext.Users.FirstOrDefault(u => u.UserName == "sindziikary");
                if (user is null)
                {

                    user = catalogContext.Users.Add(new()
                    { 
                        Id = "sindziikary",
                        UserName = "sindziikary",
                        NormalizedUserName = "sindziikary",
                    }).Entity;
                    user.PasswordHash = hasher.HashPassword(user, "sindziikary");
                    catalogContext.SaveChanges();
                }

                //задаю нового админа
                
                //user = catalogContext.Users.FirstOrDefault(u => u.UserName == "obama barack");//это именно имя пользователя
                //if (user is null)
                //{
                //    user = catalogContext.Users.Add(new()
                //    {
                //        Id = "obama",
                //        UserName = "obama",
                //        NormalizedUserName = "obama",
                //    }).Entity;
                //    user.PasswordHash = hasher.HashPassword(user, "obama barack");
                //    catalogContext.SaveChanges();
                //}
                //вот эта штука отвечает за присваивание роли, а так как у нас роль одна, то это админ
                //!catalogContext.UserRoles.Any() && эта штука нужна чтобы вставить в условие
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
                        City = "ПохуйГород",
                        Street = "Улица поебать",
                        House = "Дом колотушкина",
                        IsMap = true,
                        Json = "{\"key\":\"value\"}"
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
