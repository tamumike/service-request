using System;
using System.IO;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Helpers
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _settings;
        private readonly IWebHostEnvironment _env;
        public EmailSender(IOptions<EmailSettings> settings, IWebHostEnvironment env)
        {
            _env = env;
            _settings = settings.Value;
        }
        public async Task SendEmailAsync(string email, string subject, string message, Request request)
        {
            try
            {
                var mimeMessage = new MimeMessage();

                mimeMessage.From.Add(new MailboxAddress(_settings.SenderName, _settings.Sender));

                mimeMessage.To.Add(new MailboxAddress(email));

                mimeMessage.Subject = subject;

                var pathToFile = _env.WebRootPath + Path.DirectorySeparatorChar.ToString() + "Templates" + Path.DirectorySeparatorChar.ToString() + "email_template.html";

                var builder = new BodyBuilder();

                using (StreamReader streamReader = System.IO.File.OpenText(pathToFile))
                {
                    builder.HtmlBody = streamReader.ReadToEnd();
                }

                string messageBody = string.Format(builder.HtmlBody, request.RequestID);

                mimeMessage.Body = new TextPart("html")
                {
                    Text = messageBody
                };

                using (var client = new SmtpClient())
                {
                    // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                    if (_env.IsDevelopment())
                    {
                        // The third parameter is useSSL (true if the client should make an SSL-wrapped
                        // connection to the server; otherwise, false).
                        await client.ConnectAsync(_settings.MailServer, _settings.MailPort, false);
                    }
                    else
                    {
                        await client.ConnectAsync(_settings.MailServer, _settings.MailPort);
                    }

                    // Note: only needed if the SMTP server requires authentication
                    // await client.AuthenticateAsync(_settings.Sender, _settings.Password);

                    await client.SendAsync(mimeMessage);

                    await client.DisconnectAsync(true);
                }

            }
            catch (Exception ex)
            {
                // TODO: handle exception
                throw new InvalidOperationException(ex.Message);
            }
        }
    }
}