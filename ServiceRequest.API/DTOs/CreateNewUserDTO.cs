using System;

namespace ServiceRequest.API.DTOs
{
    public class CreateNewUserDTO
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastLogin { get; set; }
        public int Role { get; set; }

        public CreateNewUserDTO()
        {
            DateCreated = DateTime.Now;
            LastLogin = DateTime.Now;
        }
    }
}