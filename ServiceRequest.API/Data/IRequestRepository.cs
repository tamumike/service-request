using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Data
{
    public interface IRequestRepository
    {
        Task<IEnumerable<Request>> Get();
        Task<string> GenerateRequestID();
        Task<Request> GetRequest(string id);
        Task<Request> CreateNewRequest(Request request);
        Task<Comment> CreateNewComment(Comment comment);
        Task<IEnumerable<Comment>> GetComments(string id);
        Task<Attachment> UploadAttachment(Attachment attachment);
        Task<IEnumerable<Location>> GetLocations();
        Task<IEnumerable<PropertyCode>> GetPropertyCodes();
    }
}