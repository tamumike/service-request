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
        public Guid SessionID { get; set; }

        public CreateNewUserDTO(string username, string displayName, string email, int role)
        {
            Username = username;
            DisplayName = displayName;
            Email = email;
            Role = role;
            DateCreated = DateTime.Now;
            // LastLogin = DateTime.Now;
            // SessionID = Guid.NewGuid();
        }
    }
}