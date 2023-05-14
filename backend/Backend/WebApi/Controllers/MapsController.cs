using Microsoft.AspNetCore.Mvc;
using WebApi.Model;
using WebApi1.Data;

namespace WebApi.Controllers;
[ApiController]
[Route("[controller]")]
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
        var mapList =
            from map in _context.Maps
            select map;
        return new JsonResult(mapList);
    }

    [HttpGet("{id}")]
    public IActionResult GetMaps(int id)
    {
        var desiredMap =
            (from map in _context.Maps
            where map.Id == id
            select map).FirstOrDefault();
        if (desiredMap == null) return NotFound(new{Message="Этой карты не существует"});
        return new JsonResult(desiredMap);
    }

    [HttpPost]
    public IActionResult PostMaps(
        string city,
        string street,
        string house,
        string json)
    {
        try
        {
            _context.Maps.Add(new Map()
            {
                City = city,
                Street = street,
                House = house,
                Json = json
            });
            _context.SaveChanges();
            return Ok(new { Message = "Карта создана успешно" });
        }
        catch
        {
            return StatusCode(500, new { Message = "Ошибка при создании карты" });
        }
    }

    [HttpPatch("{id}")]
    public IActionResult PatchMaps(
        int id,
        string? city,
        string? street,
        string? house,
        string? json)
    {
        var desiredMap =
            (from map in _context.Maps
                where map.Id == id
                select map).FirstOrDefault();
        if (desiredMap == null) return NotFound(new{Message="Этой карты не существует"});
        if (city != null) desiredMap.City = city;
        if (street != null) desiredMap.Street = street;
        if (house != null) desiredMap.House = house;
        if (json != null) desiredMap.Json = json;
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
    public IActionResult PutMaps(int id,string loginId)
    {
        throw new NotImplementedException();
    }

    [HttpDelete("{id}")]
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
}