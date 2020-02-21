using AutoMapper;
using ServiceRequest.API.DTOs;
using ServiceRequest.API.Models;

namespace ServiceRequest.API.Helpers
{
    public class Automapper : Profile
    {
        public Automapper()
        {

            CreateMap<CreateNewRequestDTO, Request>();
            CreateMap<CreateNewCommentDTO, Comment>();
            CreateMap<CreateNewAttachmentDTO, Attachment>();
            CreateMap<CreateNewUserDTO, User>();
            CreateMap<ReviewedRequestDTO, Request>();
            CreateMap<UpdateRequestDTO, Request>();
        }
    }
}