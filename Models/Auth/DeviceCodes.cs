﻿using System;
using System.Collections.Generic;

namespace WebApiBiusoProject.Models
{
    public partial class DeviceCodes
    {
        public string UserCode { get; set; }
        public string DeviceCode { get; set; }
        public string SubjectId { get; set; }
        public string ClientId { get; set; }
        public string CreationTime { get; set; }
        public string Expiration { get; set; }
        public string Data { get; set; }
    }
}
