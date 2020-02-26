using System;

namespace ServiceRequest.API.DTOs
{
    public class EngineerReviewedRequestDTO
    {
        public decimal ExpectedCost { get; set; }
        public DateTime PromiseDate { get; set; }
        public string Status { get; set; }

        public EngineerReviewedRequestDTO()
        {
            Status = "Completed";
        }
    }
}