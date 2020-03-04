using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceRequest.API.Helpers;

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
        [AllowedExtensionsAttribute(new string[] { ".txt", ".pdf", ".doc", ".docx" })]
        public IFormFile File { get; set; }

        public CreateNewAttachmentDTO()
        {
            CreatedDate = DateTime.Now.Date;
        }
    }
}