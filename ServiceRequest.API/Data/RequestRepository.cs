using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Data
{
    public class RequestRepository : IRequestRepository
    {
        private readonly DataContext _context;
        public RequestRepository(DataContext context)
        {
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

        public async Task<IEnumerable<Request>> Get()
        {
            var requests = _context.Requests.Include(r => r.Comments);
            return await requests.ToListAsync();
        }

        public async Task<IEnumerable<Comment>> GetComments(string id)
        {
            var comments = await _context.Comments.Where(c => c.RequestID == id).ToListAsync();
            return comments;
        }

        public async Task<Request> GetRequest(string id)
        {
            var request = _context.Requests.Include(r => r.Comments).Where(r => r.RequestID == id);
            return await request.FirstOrDefaultAsync();
        }
    }
}