using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceRequest.API.Data;

namespace ServiceRequest.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;
        public UserController(IUserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public string Get()
        {
            var userInfo = _repo.GetUsername();
            return userInfo;
        }

    }
}