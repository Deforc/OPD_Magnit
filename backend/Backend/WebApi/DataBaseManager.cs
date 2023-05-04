using WebApi1.Data;
using Microsoft.AspNetCore.Identity;
namespace WebApi
{
    public interface IDataBaseManager
    {
        ICollection<IdentityUser>? GetUsers();
        bool DeleteUser(IdentityUser user);
    }

    public class DataBaseManager:IDataBaseManager
    {
        private ApplicationDbContext _context;
        public DataBaseManager(ApplicationDbContext context) 
        {
            this._context = context;
        }

        public bool DeleteUser(IdentityUser user)
        {
            throw new NotImplementedException();
        }

        public ICollection<IdentityUser>? GetUsers()
        {
            var list = from user in _context.Users
                       select user;
            return list.ToList();
        }
    }
}
