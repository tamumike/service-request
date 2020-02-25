using System.Threading.Tasks;

namespace ServiceRequest.API.Helpers
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}