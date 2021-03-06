using System;
using System.ComponentModel.DataAnnotations;
using ServiceRequest.API.Helpers;

namespace ServiceRequest.API.DTOs
{
    public class CreateNewRequestDTO
    {
        public string RequestID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        
        [FutureDateAttribute(ErrorMessage = "Invalid Date")]
        public DateTime RequestDate { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        
        [MaxLength(255)]
        public string Description { get; set; }
        public string Deliverables { get; set; }
        public decimal ApprovedBudget { get; set; }
        public bool Submitted { get; set; }
        public string Status { get; set; }
        public string Owner { get; set; }

        public CreateNewRequestDTO()
        {
            ApprovedBudget = 25000.00M;
            CreatedDate = DateTime.Now;
            Submitted = true;
            Status = "Requested";
            Owner = "Admin";
        }
    }
}