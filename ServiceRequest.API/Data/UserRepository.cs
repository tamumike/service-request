using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using ServiceRequest.API.DTOs;
using ServiceRequest.API.Helpers;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _http;
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public UserRepository(IWebHostEnvironment env, IHttpContextAccessor http, DataContext context, IConfiguration config)
        {
            _config = config;
            _context = context;
            _http = http;
            _env = env;

        }

        public int CheckUserRole(string username)
        {
            var administrators = _config.GetSection("UserInformation:Administrators").Get<string[]>();
            var engineers = this.GetGroupMembers();

            foreach (var engineer in engineers)
            {
                if (engineer.Username == username)
                    return 3;
            }

            if (administrators.Contains(username))
                return 2;

            return 1;
        }

        public void ClearCookies()
        {
            throw new NotImplementedException();
        }

        public async Task<User> CreateNewUser(User user)
        {
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public IEnumerable<GroupMember> GetGroupMembers()
        {
            var groupName = _config.GetSection("UserInformation:Group").Get<string>();
            List<GroupMember> memberList = new List<GroupMember>();
            PrincipalContext principalContext = new PrincipalContext(ContextType.Domain);
            GroupPrincipal groupPrincipal = GroupPrincipal.FindByIdentity(principalContext, groupName);
            var members = groupPrincipal.GetMembers(true);

            foreach (UserPrincipal member in members)
            {
                GroupMember groupMember = new GroupMember();
                groupMember.Username = member.SamAccountName;
                groupMember.FullName = member.DisplayName;

                memberList.Add(groupMember);
                // memberList.Add(["fullName", user.DisplayName]);
                // memberList.Add(new KeyValuePair<string, string>("username", user.SamAccountName));
            }

            return memberList;
        }

        public Task<User> GetUser(string username)
        {
            var user = _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            return user;
        }

        public UserInfo GetUserInfo(string username)
        {
            UserInfo userInfo = new UserInfo();
            PrincipalContext principalContext = new PrincipalContext(ContextType.Domain);
            UserPrincipal userPrincipal = UserPrincipal.FindByIdentity(principalContext, username);

            if (!string.IsNullOrEmpty(userPrincipal.SamAccountName))
            {
                userInfo.Username = userPrincipal.SamAccountName;
            }
            if (!string.IsNullOrEmpty(userPrincipal.DisplayName))
            {
                userInfo.DisplayName = userPrincipal.DisplayName;
            }
            if (!string.IsNullOrEmpty(userPrincipal.EmailAddress))
            {
                userInfo.Email = userPrincipal.EmailAddress;
            }
                userInfo.Role = this.CheckUserRole(username);

            return userInfo;
        }

        public string GetUsername()
        {
            string username = null;
            if (_env.IsDevelopment())
            {
                username = Environment.UserName;
            }
            else
            {
                username = _http.HttpContext.User.Identity.Name;
            }

            return username;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(u => u.Username == username))
                return true;

            return false;
        }
    }
}