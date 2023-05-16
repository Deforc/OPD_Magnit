using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Identity.Client;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Reflection.Metadata.Ecma335;
using WebApi1.Data;

namespace WebApi.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("[controller]")]
public class UsersController : Controller
{
    private ApplicationDbContext _context { get; set; }

    /*public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }*/
    public IPasswordHasher<IdentityUser> _hasher { get; set; }

    public UsersController(ApplicationDbContext context, IPasswordHasher<IdentityUser> hasher)
    {
        _hasher = hasher;
        _context = context;
    }
    /// <summary>
    /// Возвращает список пользователей
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    // [Route("Users")]
    public IActionResult GetUsers()
    {
        var list =
            from user in _context.Users
            select new
            {
                id = user.Id,
                firstname = user.UserName,
                lastname = user.NormalizedUserName
            };
        return new JsonResult(list);
    }


    [HttpGet]
    [Route("Admins")]
    public IActionResult GetAdmins()
    {
        var list =
            from user in _context.Users
            from userRole in _context.UserRoles
            where userRole.UserId == user.Id 
            select new
            {
                user = user.Id,
                role = userRole.RoleId
            };
        return new JsonResult(list);
    }


    [HttpDelete]
    //[Route("DeleteUser")]
    public IActionResult Delete(string name)
    {
        var user = _context.Users.Find(name);
        if (user == null)
        {
            return BadRequest("такого пидораса нет");
        }
        else
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
            return new EmptyResult();
        }
    }

    public record struct CreateUserData(
        string? Firstname,
        string? Lastname,
        string? Password,
        string? Role,
        string? Id);
    [HttpPost]
    //[Route("NewUser")]
    public IActionResult Post(
        /*[From] string? firstname, 
        [FromBody] string? lastname, 
        [FromBody] string? password, 
        [FromBody] string? Role, 
        [FromBody] string? id*/
        [FromBody] CreateUserData requestBody
        )
    {
        var role = _context.Roles.FirstOrDefault(u => u.Id == null);
        //if (Role == null) return BadRequest(new { Message = "Не указана роль пользователя" });
        role = _context.Roles.FirstOrDefault(u => u.Id == requestBody.Role);
        _context.SaveChanges();


        var user = _context.Users.FirstOrDefault(u => u.UserName == requestBody.Id);
        if (requestBody.Firstname == null || requestBody.Password == null || requestBody.Lastname == null)
        {
            return BadRequest(new { Message = "не введен пользователь, уебан" });
        }
        else
        {
            user = _context.Users.Add(new()
            {
                Id = requestBody.Id,
                UserName = requestBody.Firstname,
                NormalizedUserName = requestBody.Lastname,
            }).Entity;
            user.PasswordHash = _hasher.HashPassword(user, requestBody.Password);
            _context.SaveChanges();
        }

        if (user != null && role != null)
        {
            _context.UserRoles.Add(new()
            {
                RoleId = role.Id,
                UserId = user.Id,
            });
            _context.SaveChanges();
        }

        return Ok(new { Message = "Хотя долбоеб, но смог правильно пользовавтеля добавить" });
    }

    [HttpPatch]
    public IActionResult Patch(string firstname, string? lastname, string password, string? Role, string? newfirstname,
        string? newpassword, string? newlastname, string? id)
    {
        var user = _context.Users.Find(firstname);
        if (user == null)
        {
            return BadRequest(new { Message = "такого пидораса нет" });
        }

        if (newfirstname != null)
        {
            user.UserName = newfirstname;
            _context.SaveChanges();
        }

        if (newpassword != null)
        {
            user.PasswordHash = _hasher.HashPassword(user, newpassword);
            _context.SaveChanges();
        }

        if (newlastname != null)
        {
            user.NormalizedUserName = newlastname;
            _context.SaveChanges();
        }

        return Ok(new { Message = "Хотя долбоеб, но смог правильно пользовавтеля изменить" });
    }
}