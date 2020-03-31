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

            // Check if cookie exists
            IRequestCookieCollection requestCookies = _http.HttpContext.Request.Cookies;
            IResponseCookies responseCookies = _http.HttpContext.Response.Cookies;
            if (requestCookies.ContainsKey(_cookie))
            {
                user = await _repo.GetUserFromCookie(requestCookies, _cookie);

                

                // responseCookies.Delete(_cookie);
            }
            else {

                // Check if user exists
                string username = _repo.GetUsername();

                if (await _repo.UserExists(username))
                {
                    user = await _repo.GetUser(username);
                }
                else // if user does not exist
                {
                    UserInfo userInfo = _repo.GetUserInfo(username);
                    CreateNewUserDTO createNewUserDTO = new CreateNewUserDTO(userInfo.Username, userInfo.DisplayName, userInfo.Email, userInfo.Role);
                    var userToCreate = _mapper.Map<User>(createNewUserDTO);
                    user = await _repo.CreateNewUser(userToCreate);
                }

            }

            user.LastLogin = DateTime.Now;
            user.SessionID = Guid.NewGuid();

            // _http.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:4200");

            if (await _repo.SaveAll())
            {
                CookieOptions cookieOptions = new CookieOptions();
                cookieOptions.Path = "/";
                cookieOptions.HttpOnly = false;
                cookieOptions.Secure = false;
                cookieOptions.Domain = "leg-adhocsql";
                responseCookies.Append(_cookie, user.SessionID.ToString(), cookieOptions);
                return Ok(user);
            }

            throw new Exception($"Error in login.");

        }

    }
}