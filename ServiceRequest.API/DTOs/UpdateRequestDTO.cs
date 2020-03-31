using System;

namespace ServiceRequest.API.DTOs
{
    public class UpdateRequestDTO
    {
        public bool? Acknowledged { get; set; }
        public string Status { get; set; }
    }
}