using System.ComponentModel.DataAnnotations;

namespace ServiceRequest.API.Models
{
    public class Location
    {
        [Key]
        public int PropertyCode { get; set; }
        public string Name { get; set; }

    }
}