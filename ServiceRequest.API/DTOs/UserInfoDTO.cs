namespace ServiceRequest.API.DTOs
{
    public class UserInfoDTO
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }

        public UserInfoDTO()
        {
            Role = 1;
        }
    }
}