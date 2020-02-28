namespace ServiceRequest.API.Helpers
{
    public class RequestParams
    {
        public string Owner { get; set; }
        public string CreatedBy { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public string RequestID { get; set; }
        public string EngineerAssigned { get; set; }
        public string PropertyCode { get; set; }
        public bool Acknowledged { get; set; }
    }
}