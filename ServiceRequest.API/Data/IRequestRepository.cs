using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceRequest.API.Helpers;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Data
{
    public interface IRequestRepository
    {
        Task<IEnumerable<Request>> Get(RequestParams requestParams);
        Task<string> GenerateRequestID();
        Task<Request> GetRequest(string id);
        Task<Request> CreateNewRequest(Request request);
        Task<Comment> CreateNewComment(Comment comment);
        Task<IEnumerable<Comment>> GetComments(string id);
        Task<Attachment> UploadAttachment(Attachment attachment);
        Task<IEnumerable<Location>> GetLocations();
        Task<bool> SaveAll();
        Task<IEnumerable<Request>> GetOwnedRequests(string username);
    }
}