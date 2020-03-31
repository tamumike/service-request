using System;

namespace ServiceRequest.API.DTOs
{
    public class ReviewedRequestDTO
    {
        public string CreatedBy { get; set; }
        public string AFE { get; set; }
        public string EngineerAssigned { get; set; }
        public DateTime CoupaDate { get; set; }
        public int PropertyCode { get; set; }
        public bool Approved { get; set; }
        public string Owner { get; set; }
        public string Status { get; set; }
        public bool Acknowledged { get; set; }

        public ReviewedRequestDTO()
        {
            Acknowledged = false;
        }
    }
}