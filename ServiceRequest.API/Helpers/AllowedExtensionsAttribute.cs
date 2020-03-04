using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace ServiceRequest.API.Helpers
{
public class AllowedExtensionsAttribute : ValidationAttribute
{
    private readonly string[] _Extensions;
    public AllowedExtensionsAttribute(string[] Extensions)
    {
        _Extensions = Extensions;
    }

    protected override ValidationResult IsValid(
    object value, ValidationContext validationContext)
    {
        var file = value as IFormFile;
        var extension = Path.GetExtension(file.FileName);
        if (!(file == null))
        {
            if (!_Extensions.Contains(extension.ToLower()))
            {
                return new ValidationResult(GetErrorMessage());
            }
        }

        return ValidationResult.Success;
    }

    public string GetErrorMessage()
    {
        return $"This file type is not allowed!";
    }
}
}