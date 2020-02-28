using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace ServiceRequest.API.Models
{
    public class Attachment
    {
        public int AttachmentID { get; set; }
        public string RequestID { get; set; }
        public string FileName { get; set; }
        public string URL { get; set; }
        public DateTime CreatedDate { get; set; }

        [NotMappedAttribute]
        public IFormFile File { get; set; }
    }
}