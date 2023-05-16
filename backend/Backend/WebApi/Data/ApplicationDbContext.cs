using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApi.Model;

namespace WebApi1.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
     /// <summary>
     /// Коллекция с картами
     /// </summary>
        public DbSet<Map> Maps { get; set; }
        /// <summary>
        /// Коллекция с избранными картами пользователя
        /// </summary>
        public DbSet<MapUser> MapUsers { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}