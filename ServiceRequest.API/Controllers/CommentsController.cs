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
    public class CommentsController : ControllerBase
    {
        private readonly IRequestRepository _repo;
        private readonly IUserRepository _urepo;
        private readonly IMapper _mapper;

        public CommentsController(IRequestRepository repo, IUserRepository urepo, IMapper mapper)
        {
            _mapper = mapper;
            _urepo = urepo;
            _repo = repo;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateNewComment(string id, CreateNewCommentDTO createNewCommentDTO)
        {
            createNewCommentDTO.RequestID = id;
            createNewCommentDTO.Author = _urepo.GetUsername();

            var commentToCreate = _mapper.Map<Comment>(createNewCommentDTO);
            var createdComment = await _repo.CreateNewComment(commentToCreate);

            return Ok(createdComment);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComments(string id)
        {
            var comments = await _repo.GetComments(id);
            return Ok(comments);
        }
    }
}