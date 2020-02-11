using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceRequest.API.Data;
using ServiceRequest.API.DTOs;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RequestsController : ControllerBase
    {
        private readonly IRequestRepository _repo;
        private readonly IUserRepository _urepo;
        private readonly IMapper _mapper;
        public RequestsController(IRequestRepository repo, IUserRepository urepo, IMapper mapper)
        {
            _mapper = mapper;
            _urepo = urepo;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var requests = await _repo.Get();
            return Ok(requests);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequest(string id)
        {
            var request = await _repo.GetRequest(id);
            return Ok(request);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewRequest(CreateNewRequestDTO createNewRequestDTO)
        {
            createNewRequestDTO.RequestID = await _repo.GenerateRequestID();
            createNewRequestDTO.CreatedBy = _urepo.GetUsername();

            var requestToCreate = _mapper.Map<Request>(createNewRequestDTO);
            var createdRequest = await _repo.CreateNewRequest(requestToCreate);

            return Ok(createdRequest);
        }
    }
}