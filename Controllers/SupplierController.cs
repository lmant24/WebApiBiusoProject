using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiBiusoProject.Models;

namespace WebApiBiusoProject.Controllers
{
    [ApiController]
    public class SupplierController : ControllerBase
    {
        SupplierAccessLayer objproduct = new SupplierAccessLayer();

        [Authorize]
        [Route("supplier")]
        [HttpGet]
        public IEnumerable<Supplier> GetAllSuppliers()
        {
            return objproduct.GetAllSuppliers();
        }

        [Authorize]
        [Route("supplier/add")]
        [HttpPost]
        public bool AddSupplier([FromBody] Supplier supplier)
        {
            return objproduct.AddSupplier(supplier);
        }
    }
}
