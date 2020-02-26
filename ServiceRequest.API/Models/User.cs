using System;

namespace ServiceRequest.API.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastLogin { get; set; }
        public int Role { get; set; }
        public Guid SessionID { get; set; }
    }
}