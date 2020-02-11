using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

namespace ServiceRequest.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _http;
        public UserRepository(IWebHostEnvironment env, IHttpContextAccessor http)
        {
            _http = http;
            _env = env;

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
    }
}