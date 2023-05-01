using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi1.Data;

namespace WebApi.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("[controller]")]
public class UsersController : Controller
{
    private ApplicationDbContext _context { get; set; }

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("")]
    public IActionResult GetUsers()
    {
        var list =
            from user in _context.Users
            select  user.Id;
        return new JsonResult(list);
    }

    [Route("Admins")]
    [HttpGet]
    public IActionResult GetAdmins()
    {
        var list =
            from user in _context.Users
            from userRole in _context.UserRoles
            where  userRole.UserId == user.Id
            select new
            {
                user = user.Id,
                role = userRole.RoleId
            };
        return new JsonResult(list);
    }
    
    [HttpGet("Саняпидор")]
    public string GetInfo()
    {
        return "Саша пидор тупой заебал нихера не хочет понимать";
    }
}