using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ServiceRequest.API.DTOs
{
    public class CreateNewAttachmentDTO
    {
        public int AttachmentID { get; set; }
        public string RequestID { get; set; }
        public string FileName { get; set; }
        public string URL { get; set; }
        public DateTime CreatedDate { get; set; }

        [FromForm(Name = "uploadFile")]
        public IFormFile File { get; set; }

        public CreateNewAttachmentDTO()
        {
            CreatedDate = DateTime.Now.Date;
        }
    }
}