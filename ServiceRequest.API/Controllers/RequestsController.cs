using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceRequest.API.Data;
using ServiceRequest.API.DTOs;
using ServiceRequest.API.Helpers;
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
        private readonly IEmailSender _emailSender;
        public RequestsController(IRequestRepository repo, IUserRepository urepo, IMapper mapper, IEmailSender emailSender)
        {
            _emailSender = emailSender;
            _mapper = mapper;
            _urepo = urepo;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]RequestParams requestParams)
        {
            var requests = await _repo.Get(requestParams);
            return Ok(requests);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequest(string id)
        {
            var request = await _repo.GetRequest(id);
            return Ok(request);
        }

        [HttpGet("locations")]
        public async Task<IActionResult> GetLocations()
        {
            var locations = await _repo.GetLocations();
            return Ok(locations);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewRequest(CreateNewRequestDTO createNewRequestDTO)
        {
            createNewRequestDTO.RequestID = await _repo.GenerateRequestID();

            var requestToCreate = _mapper.Map<Request>(createNewRequestDTO);
            var createdRequest = await _repo.CreateNewRequest(requestToCreate);

            return Ok(createdRequest);
        }

        [HttpPut("reviewed/{ID}")]
        public async Task<IActionResult> SubmitAfterReview([FromRoute]string ID, ReviewedRequestDTO reviewedRequestDTO)
        {
            var requestFromDB = await _repo.GetRequest(ID);

            if (reviewedRequestDTO.Approved)
            {
                reviewedRequestDTO.Owner = reviewedRequestDTO.EngineerAssigned;
            }
            else
            {
                reviewedRequestDTO.Owner = reviewedRequestDTO.CreatedBy;
            }

            var requestToUpdate = _mapper.Map(reviewedRequestDTO, requestFromDB);

            if (await _repo.SaveAll())
                // await _emailSender.SendEmailAsync("mlinden@lucid-energy.com", "ESR", "This is the body", requestFromDB);
                return Ok(requestFromDB);

            throw new Exception($"Error submitting the request.");
        }

        [HttpPut("ereviewed/{ID}")]
        public async Task<IActionResult> SubmitAfterEngineerReview([FromRoute]string ID, EngineerReviewedRequestDTO engineerReviewedRequestDTO)
        {
            Console.WriteLine(engineerReviewedRequestDTO.ExpectedCost);
            var requestFromDB = await _repo.GetRequest(ID);

            var requestToUpdate = _mapper.Map(engineerReviewedRequestDTO, requestFromDB);

            if (await _repo.SaveAll())
                return Ok(requestFromDB);

            throw new Exception($"Error submitting the request.");
        }

        [HttpPut("{ID}")]
        public async Task<IActionResult> UpdateRequest([FromRoute]string ID, UpdateRequestDTO updateRequestDTO)
        {
            var requestFromDB = await _repo.GetRequest(ID);
            var requestToUpdate = _mapper.Map(updateRequestDTO, requestFromDB);

            if (await _repo.SaveAll())
                return Ok(requestFromDB);

            throw new Exception($"Error updating the status.");
        }

        [HttpPut("{ID}/resolved")]
        public async Task<IActionResult> ResolveRequest([FromRoute]string ID, ResolvedRequestDTO resolvedRequestDTO)
        {

            var requestFromDB = await _repo.GetRequest(ID);
            var requestToUpdate = _mapper.Map(resolvedRequestDTO, requestFromDB);

            if (await _repo.SaveAll())
                return Ok(requestFromDB);

            throw new Exception($"Error resolving the request.");

        }
    }
}