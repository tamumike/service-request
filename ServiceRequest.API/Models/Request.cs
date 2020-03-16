using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ServiceRequest.API.Models
{
    public class Request
    {
        public string RequestID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime RequestDate { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Deliverables { get; set; }
        public string AFE { get; set; }
        public int? PropertyCode { get; set; }
        public string EngineerAssigned { get; set; }
        public DateTime? PromiseDate { get; set; }
        public bool Approved { get; set; }
        public bool Submitted { get; set; }
        public decimal ApprovedBudget { get; set; }
        public decimal? ExpectedCost { get; set; }
        public DateTime? CoupaDate { get; set; }
        public string Status { get; set; }
        public bool Acknowledged { get; set; }
        public string Owner { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Attachment> Attachments { get; set; }
    }
}