using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServiceRequest.API.Models;
using ServiceRequest.API.Helpers;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace ServiceRequest.API.Data
{
    public class RequestRepository : IRequestRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;
        public RequestRepository(DataContext context, IConfiguration config, IWebHostEnvironment env)
        {
            _env = env;
            _config = config;
            _context = context;
        }

        public async Task<Comment> CreateNewComment(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<Request> CreateNewRequest(Request request)
        {
            await _context.Requests.AddAsync(request);
            await _context.SaveChangesAsync();

            return request;
        }

        public async Task<string> GenerateRequestID()
        {
            var requestsFromDatabase = await _context.Requests.ToListAsync();
            int[] requestNumbers = new int[requestsFromDatabase.Count()];
            string generatedRequestNumber = null;
            int maxNumber = 1;
            if (requestsFromDatabase?.Any() ?? false)
            {
                for (var i = 0; i < requestNumbers.Count(); i++)
                {
                    int number;
                    string requestNumber = requestsFromDatabase.ElementAt(i).RequestID.Split("-")[1];
                    if (Int32.TryParse(requestNumber, out number)) requestNumbers[i] = number;
                }
                maxNumber += requestNumbers.Max();
            }

            string converted = maxNumber.ToString().PadLeft(3, '0');
            DateTime currentDate = DateTime.Now.Date;
            string twoDigitYear = currentDate.ToString("yy");
            generatedRequestNumber = $"{twoDigitYear}-{converted}";

            return generatedRequestNumber;
        }

        public async Task<IEnumerable<Request>> Get(RequestParams requestParams)
        {
            var requests = _context.Requests
                .Include(r => r.Comments)
                .Include(r => r.Attachments)
                .Where(r => r.ResolutionDate == null)
                .AsQueryable();

            if (!string.IsNullOrEmpty(requestParams.Owner))
            {
                requests = requests.Where(r => r.Owner == requestParams.Owner);
            }
            if (!string.IsNullOrEmpty(requestParams.CreatedBy))
            {
                requests = requests.Where(r => r.CreatedBy == requestParams.CreatedBy);
            }
            if (!string.IsNullOrEmpty(requestParams.Location))
            {
                requests = requests.Where(r => r.Location == requestParams.Location);
            }
            if (!string.IsNullOrEmpty(requestParams.Status))
            {
                requests = requests.Where(r => r.Status == requestParams.Status);
            }
            if (!string.IsNullOrEmpty(requestParams.RequestID))
            {
                requests = requests.Where(r => r.RequestID == requestParams.RequestID);
            }
            if (!string.IsNullOrEmpty(requestParams.EngineerAssigned))
            {
                requests = requests.Where(r => r.EngineerAssigned == requestParams.EngineerAssigned);
            }
            if (requestParams.Acknowledged == true)
            {
                requests = requests.Where(r => r.Acknowledged == true);
            }

            return await requests.ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetComments(string id)
        {
            var comments = await _context.Comments
                .Where(c => c.RequestID == id)
                .ToListAsync();

            return comments;
        }

        public async Task<IEnumerable<Location>> GetLocations()
        {
            var locations = await _context.Locations.OrderBy(x => x.Name).ToListAsync();
            return locations;
        }

        public async Task<IEnumerable<Request>> GetOwnedRequests(string username)
        {
            var requests = await _context.Requests
                .Where(r => r.Owner == username)
                .ToListAsync();

            return requests;
        }

        public async Task<Request> GetRequest(string id)
        {
            var request = _context.Requests
                .Include(r => r.Comments)
                .Include(r => r.Attachments)
                .Where(r => r.RequestID == id);

            return await request.FirstOrDefaultAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Attachment> UploadAttachment(Attachment attachment)
        {
            await _context.Attachments.AddAsync(attachment);
            await _context.SaveChangesAsync();

            return attachment;
        }
    }
}