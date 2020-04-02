using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceRequest.API.Data;
using ServiceRequest.API.DTOs;
using ServiceRequest.API.Helpers;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _http;
        private readonly string _cookie = "esr-session";
        public UserController(IUserRepository repo, IMapper mapper, IHttpContextAccessor http)
        {
            _http = http;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get(Guid sessionID)
        {
            var username = _repo.GetUsername();

            if (!await _repo.UserExists(username))
            {
                var userInfo = _repo.GetUserInfo(username); // TESTING PURPOSES ONLY
            }

            var user = await _repo.GetUser(username);

            return Ok(user);
        }

        [HttpGet("group")]
        public IEnumerable<GroupMember> GetMembers()
        {
            var members = _repo.GetGroupMembers();

            return members;
        }

        [HttpGet("checkprivs/{sessionID}")]
        public async Task<IActionResult> IsAdministrator([FromRoute]string sessionID)
        {
            var sessionIDAsGuid = Guid.Parse(sessionID);
            return Ok(await _repo.IsAdministrator(sessionIDAsGuid));
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login()
        {
            User user = null;
            var username = _repo.GetUsername();
            IResponseCookies responseCookies = _http.HttpContext.Response.Cookies;

            if ( await _repo.UserExists(username)) 
            {
                user = await _repo.GetUser(username);
            }
            else 
            {
                UserInfo userInfo = _repo.GetUserInfo(username);
                CreateNewUserDTO createNewUserDTO = new CreateNewUserDTO(userInfo.Username, userInfo.DisplayName, userInfo.Email, userInfo.Role);
                var userToCreate = _mapper.Map<User>(createNewUserDTO);
                user = await _repo.CreateNewUser(userToCreate);
            }

            user.LastLogin = DateTime.Now;
            user.SessionID = Guid.NewGuid();

            if (await _repo.SaveAll())
            {
                CookieOptions cookieOptions = new CookieOptions();
                cookieOptions.Path = "/";
                cookieOptions.HttpOnly = false;
                cookieOptions.Secure = false;
                // cookieOptions.Domain = "localhost";
                cookieOptions.Domain = "leg-adhocsql";
                responseCookies.Append(_cookie, user.SessionID.ToString(), cookieOptions);
            }

            return Ok(user);
        }

    }
}