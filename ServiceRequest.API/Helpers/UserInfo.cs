namespace ServiceRequest.API.Helpers
{
    public class UserInfo
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }

        public UserInfo()
        {
            Role = 1;
        }        
    }
}