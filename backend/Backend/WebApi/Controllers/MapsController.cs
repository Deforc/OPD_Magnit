using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;
using WebApi1.Data;

namespace WebApi.Controllers;
[ApiController]
[Route("[controller]")]
[Authorize]
public class MapsController:Controller
{
    private ApplicationDbContext _context;

    public MapsController(ApplicationDbContext context)
    {
        this._context = context;
    }

    [HttpGet]
    public IActionResult GetMaps()
    {
        var role = User.FindFirstValue(ClaimTypes.Role);
        
        var mapList =
            from map in _context.Maps
            where role == "Admin" || map.IsMap
            select new
            {
                Id = map.Id,
                City = map.City,
                Street = map.Street,
                House = map.House
            };
        return new JsonResult(mapList);
    }

    [HttpGet("favorite")]
    public IActionResult GetFavoriteMaps()
    {
        var user = User.FindFirstValue(ClaimTypes.Name);
        if (user is null) return Unauthorized(new { Message = "Пользователь не авторизован, петух" });
        var favoritesMaps =
        from mapUser in _context.MapUsers
        where mapUser.IdentityUserId == user
        select new {Id = mapUser.MapId};

        return Json(favoritesMaps);
    }

    [HttpGet("{id}")]
    public IActionResult GetMaps(int id)
    {
        var role = User.FindFirstValue(ClaimTypes.Role);
        var desiredMap =
            (from map in _context.Maps
            where map.Id == id && (role == "Admin" || map.IsMap)
            select map).FirstOrDefault();
        if (desiredMap == null) return NotFound(new{Message="Этой карты не существует"});
        return new JsonResult(desiredMap);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult PostMaps(
        [FromBody] MapForRequest map)
    {
        if (map is null) return BadRequest(new { Message = "Отсутствуют данные карты" });
        try
        {
            var newMap = new Map();
            if (map.City != null) newMap.City = map.City;
            if (map.Street != null) newMap.Street = map.Street;
            if (map.House != null) newMap.House = map.House;
            if (map.IsMap != null) newMap.IsMap = map.IsMap.Value;
            if (map.Json != null) newMap.Json = map.Json;
            _context.Maps.Add(newMap);
            _context.SaveChanges();
            return Ok(new { Message = "Карта создана успешно" });
        }
        catch
        {
            return StatusCode(500, new { Message = "Ошибка при создании карты" });
        }
    }

    [HttpPatch("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult PatchMaps(
        int id,
        [FromBody] MapForRequest mapFromRequest)
    {
        var desiredMap =
            (from map in _context.Maps
                where map.Id == id
                select map).FirstOrDefault();
        if (desiredMap == null) return NotFound(new{Message="Этой карты не существует"});
        if (mapFromRequest.City != null) desiredMap.City = mapFromRequest.City;
        if (mapFromRequest.Street != null) desiredMap.Street = mapFromRequest.Street;
        if (mapFromRequest.House != null) desiredMap.House = mapFromRequest.House;
        if (mapFromRequest.Json != null) desiredMap.Json = mapFromRequest.Json;
        try
        {
            _context.Maps.Update(desiredMap);
            _context.SaveChanges();
            return Ok(new { Message = "Карта обновлена успешно" });
        }
        catch
        {
            return StatusCode(500, new { Message = "Ошибка при обновлении карты" });
        }
    }

    [HttpPut("{id}")]
    public IActionResult PutMaps(int id,[FromBody] string loginId)
    {
        _context.MapUsers.Add(new()
        {
            IdentityUserId = loginId,
            MapId = id
        });

        try
        {
            _context.SaveChanges();
        }
        catch
        {
            return StatusCode(500, new { Message = "Ошибка при добавлении карты в избранное" });
        }

        return Ok(new {Message = "Карта успешно добавленна в избранное"});
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteMaps(int id)
    {
        var desiredMap =
            (from map in _context.Maps
                where map.Id == id
                select map).FirstOrDefault();
        if (desiredMap == null) return NotFound(new{Message="Этой карты не существует"});
        try
        {
            _context.Maps.Remove(desiredMap);
            _context.SaveChanges();
            return new OkObjectResult(new { Message = "Карта удалена успешно" });
        }
        catch
        {
            return StatusCode(500, new { Message = "Ошибка удаления из базы данных" });
        }
    }

    public record MapForRequest(string? City, string? Street, string? House, bool? IsMap, string? Json);
}