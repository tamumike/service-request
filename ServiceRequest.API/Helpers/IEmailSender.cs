using System.Threading.Tasks;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Helpers
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message, Request request);
    }
}