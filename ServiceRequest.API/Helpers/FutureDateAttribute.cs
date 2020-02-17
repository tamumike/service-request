using System;
using System.ComponentModel.DataAnnotations;

namespace ServiceRequest.API.Helpers
{
    public class FutureDateAttribute : RangeAttribute
    {

        public FutureDateAttribute() : base(typeof(DateTime), DateTime.Now.Date.AddDays(1).ToString(), DateTime.Now.Date.AddYears(99).ToString()) {}
        
    }
}