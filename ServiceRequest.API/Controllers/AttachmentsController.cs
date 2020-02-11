using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ServiceRequest.API.Data;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AttachmentsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly DataContext _context;
        private readonly string _targetFilePath;
        public AttachmentsController(IConfiguration config, DataContext context)
        {
            _context = context;
            _config = config;
            _targetFilePath = _config.GetValue<string>("StoredFilesPath");
        }

        [HttpPost]
        public async Task<IActionResult> UploadAsync([FromForm (Name="uploadedFile")]IFormFile file)
        {
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

            return Ok(new { size, filePath, fileExt, file.Name });
        }
    }
}