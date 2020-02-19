using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ServiceRequest.API.Data;
using ServiceRequest.API.DTOs;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        public UserController(IUserRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var username = _repo.GetUsername();

            if (!await _repo.UserExists(username))
            {
                var userInfo = _repo.GetUserInfo(username); // TESTING PURPOSES ONLY
            }

            var user = await _repo.GetUser(username);

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewUser()
        {
            var username = _repo.GetUsername();

            if (await _repo.UserExists(username))
            {
                return Accepted("User already exists");
            }

            var createNewUserDTO = new CreateNewUserDTO();
            var userInfo = _repo.GetUserInfo(username);

            createNewUserDTO.Username = userInfo.Username;
            createNewUserDTO.DisplayName = userInfo.DisplayName;
            createNewUserDTO.Email = userInfo.Email;
            createNewUserDTO.Role = userInfo.Role;

            var userToCreate = _mapper.Map<User>(createNewUserDTO);
            var createdUser = await _repo.CreateNewUser(userToCreate);

            return Ok(createdUser);
        }

        [HttpPut("lastlogin")]
        public async Task<IActionResult> UpdateLastLogin()
        {
            var username = _repo.GetUsername();
            var userToUpdate = await _repo.GetUser(username);

            userToUpdate.LastLogin = DateTime.Now;

            if (await _repo.SaveAll())
                return Ok(userToUpdate);

            throw new Exception($"Error updating the login time");
        }

    }
}