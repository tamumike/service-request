using System;

namespace ServiceRequest.API.DTOs
{
    public class ResolvedRequestDTO
    {
        public string Status { get; set; }
        public DateTime? ResolutionDate { get; set; }
        public string Owner { get; set; }

        public ResolvedRequestDTO()
        {
            ResolutionDate = DateTime.Now;
            Owner = null;
        }
    }
}