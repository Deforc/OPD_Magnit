using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Model;

public class Map
{
    public int Id { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string House { get; set; }
    public bool IsMap { get; set; }
    //TODO: Добавить аттрибут для имени "Map"
    [Column("Map", TypeName = "json")]
    public string Json { get; set; }
}
