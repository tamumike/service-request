using System;

namespace ServiceRequest.API.Models
{
    public class Comment
    {
        public int CommentID { get; set; }
        public string RequestID { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Resolution { get; set; }
        public virtual Request Request { get; set; }
    }
}