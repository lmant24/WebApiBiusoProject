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
        public async Task<IActionResult> GetAllSuppliers()
        {
            var prova = await objproduct.GetAllSuppliers();
            return Ok(await objproduct.GetAllSuppliers());
        }

        [Authorize]
        [Route("supplier/add")]
        [HttpPost]
        public async Task<IActionResult> AddSupplier([FromBody] Supplier supplier)
        {
            return Ok(await objproduct.AddSupplier(supplier));
        }
    }
}
