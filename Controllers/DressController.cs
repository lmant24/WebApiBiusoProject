using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiBiusoProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prova_marika_7.Modelsnamespace;
using Microsoft.Extensions.Logging;

namespace WebApiBiusoProject.Controllers
{

    [ApiController]

    public class DressController : ControllerBase
    {
        private readonly ILogger<DressController> _logger;

        DressAccessLayer objproduct = new DressAccessLayer();

        [Authorize]
        [Route("inventary/get/{code}/{size}/{color}")]
        [HttpGet]
        public async Task<IActionResult> GetDressFromCodeSizeAndColor(string code, string size, string color)
        {
            return Ok(await objproduct.GetDressValidity(code, size, color));
        }

        [Authorize]
        [Route("inventary")]
        [HttpGet]
        public async Task<IActionResult> GetAllDresses()
        {
            return Ok(await objproduct.GetAllDresses());
        }

        [Authorize]
        [Route("inventary/delete/{code}/{size}/{color}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteDress(string code, string size, string color)
        {
            return Ok(await objproduct.DeleteDress(code, size, color));
        }

        [Authorize]
        [Route("inventary/add")]
        [HttpPost]
        //public bool AddDress(string code, string name, string size, int quantity, double price, string color, string material, string description, string supplier)
        public async Task<IActionResult> AddDress([FromBody] Dress dress)
        {
            Dress dressExists = await objproduct.GetDressValidity(dress.Code, dress.Size, dress.Color);
            if (dressExists.isValid())
            {
                return Ok(await objproduct.UpdateDress(dress, dress.Code, dress.Size, dress.Color));
            }
            else
            {
                return Ok(await objproduct.AddDress(dress));
            }            
           
        }

        [Authorize]
        [Route("inventary/update/{code}/{size}/{color}")]
        [HttpPut]
        //public bool AddDress(string code, string name, string size, int quantity, double price, string color, string material, string description, string supplier)
        public async Task<IActionResult> UpdateDress(string code, string size, string color, [FromBody] Dress dress)
        {
            //Dress dress = new Dress(code, name, size, quantity, price, color, material, description, supplier);
            return Ok(await objproduct.UpdateDress(dress, code, size, color));
            //return true;
        }
        //SellDress
        [Authorize]
        [Route("inventary/sell/{quantity}/{day}/{month}/{year}")]
        [HttpPost]
        public async Task<IActionResult> SellDress([FromBody] Dress dress, int quantity, int day, int month, int year)
        {
            //Dress dress = new Dress(code, name, size, quantity, price, color, material, description, supplier);
            DateTime date = new DateTime(year, month, day);
            return Ok(await objproduct.SellDress(dress, quantity, date));
            //return true;
        }
    }
}
