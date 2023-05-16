using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Model;

public class Map
{
    public int Id { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string House { get; set; }
    public string Building { get; set; } 
    public string Floor { get; set; }
    public bool IsMap { get; set; }

    [Column("Map", TypeName = "json")] public string Json { get; set; } = "[]";
}
[PrimaryKey(nameof(MapId), nameof(IdentityUserId))]
public class MapUser
{
    public int MapId { get; set; }
    public string IdentityUserId { get; set; }
    
    //public Map Map { get; set; }
    //public IdentityUser User { get; set; }
}