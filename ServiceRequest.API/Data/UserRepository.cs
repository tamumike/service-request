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

        public bool CheckUserRole(string username)
        {
            var administrators = _config.GetSection("UserInformation:Administrators").Get<string[]>();

            if (administrators.Contains("mlinden"))
                return true;

            return false;
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

        public Task<User> GetUser(string username)
        {
            var user = _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            return user;
        }

        public UserInfoDTO GetUserInfo(string username)
        {
            UserInfoDTO userInfoDTO = new UserInfoDTO();
            PrincipalContext principalContext = new PrincipalContext(ContextType.Domain);
            UserPrincipal userPrincipal = UserPrincipal.FindByIdentity(principalContext, username);

            if (!string.IsNullOrEmpty(userPrincipal.SamAccountName))
            {
                userInfoDTO.Username = userPrincipal.SamAccountName;
            }
            if (!string.IsNullOrEmpty(userPrincipal.DisplayName))
            {
                userInfoDTO.DisplayName = userPrincipal.DisplayName;
            }
            if (!string.IsNullOrEmpty(userPrincipal.EmailAddress))
            {
                userInfoDTO.Email = userPrincipal.EmailAddress;
            }
            if (this.CheckUserRole(username))
            {
                userInfoDTO.Role = 2;
            }

            return userInfoDTO;
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