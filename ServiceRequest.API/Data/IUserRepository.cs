using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceRequest.API.Models;
using ServiceRequest.API.DTOs;
using ServiceRequest.API.Helpers;

namespace ServiceRequest.API.Data
{
    public interface IUserRepository
    {
        void ClearCookies();
        string GetUsername();
        Task<bool> UserExists(string username);
        UserInfo GetUserInfo(string username);
        bool CheckUserRole(string username);
        Task<User> CreateNewUser(User user);
        Task<User> GetUser(string username);
        Task<bool> SaveAll();
        IEnumerable<GroupMember> GetGroupMembers();
    }
}