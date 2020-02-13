using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ServiceRequest.API.Data;
using ServiceRequest.API.DTOs;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AttachmentsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly string _targetFilePath;
        private readonly IMapper _mapper;
        private readonly IRequestRepository _repo;
        public AttachmentsController(IConfiguration config, IRequestRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            _config = config;
            _targetFilePath = _config.GetValue<string>("StoredFilesPath");
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> UploadAsync([FromForm]CreateNewAttachmentDTO createNewAttachmentDTO, [FromRoute]string id)
        {

            var file = createNewAttachmentDTO.File;
            long size = file.Length;
            var filePath = "";
            var fileExt = Path.GetExtension(file.FileName);
            if (file.Length > 0)
            {
                filePath = Path.Combine(_targetFilePath, Path.GetRandomFileName() + Path.GetExtension(file.FileName));

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            createNewAttachmentDTO.RequestID = id;
            var attachmentToCreate = _mapper.Map<Attachment>(createNewAttachmentDTO);
            var createdAttachment = await _repo.UploadAttachment(attachmentToCreate);

            // return Ok(new { size, filePath, fileExt, file.Name });
            return Ok(createdAttachment);
        }
    }
}