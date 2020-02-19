using System;

namespace ServiceRequest.API.DTOs
{
    public class CreateNewCommentDTO
    {
        public string RequestID { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }

        public CreateNewCommentDTO()
        {
            CreatedDate = DateTime.Now;
        }
    }
}