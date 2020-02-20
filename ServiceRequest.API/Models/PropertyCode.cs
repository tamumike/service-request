using System.ComponentModel.DataAnnotations;

namespace ServiceRequest.API.Models
{
    public class PropertyCode
    {
        [Key]
        public int Code { get; set; }
        public string PropertyName { get; set; }
    }
}