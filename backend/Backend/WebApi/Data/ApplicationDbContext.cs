using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApi.Model;

namespace WebApi1.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<Map> Maps { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}