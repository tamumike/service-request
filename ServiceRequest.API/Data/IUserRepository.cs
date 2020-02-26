using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceRequest.API.Models;
using ServiceRequest.API.DTOs;
using ServiceRequest.API.Helpers;
using System;

namespace ServiceRequest.API.Data
{
    public interface IUserRepository
    {
        string GetUsername();
        Task<bool> UserExists(string username);
        UserInfo GetUserInfo(string username);
        int CheckUserRole(string username);
        Task<User> CreateNewUser(User user);
        Task<User> GetUser(string username);
        Task<User> GetUser(Guid sessionID);
        Task<bool> SaveAll();
        IEnumerable<GroupMember> GetGroupMembers();
        Task<User> Login();
    }
}