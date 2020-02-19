using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceRequest.API.Models;
using ServiceRequest.API.DTOs;

namespace ServiceRequest.API.Data
{
    public interface IUserRepository
    {
        void ClearCookies();
        string GetUsername();
        Task<bool> UserExists(string username);
        UserInfoDTO GetUserInfo(string username);
        bool CheckUserRole(string username);
        Task<User> CreateNewUser(User user);
        Task<User> GetUser(string username);
        Task<bool> SaveAll();
    }
}