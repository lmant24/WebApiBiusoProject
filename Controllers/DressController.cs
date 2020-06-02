using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiBiusoProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using prova_marika_7.Modelsnamespace;

namespace WebApiBiusoProject.Controllers
{

    [ApiController]

    public class DressController : ControllerBase
    {
        DressAccessLayer objproduct = new DressAccessLayer();

        [Authorize]
        [Route("inventary/get/{code}/{size}/{color}")]
        [HttpGet]
        public Dress GetDressFromCodeSizeAndColor(string code, string size, string color)
        {
            return objproduct.GetDressFromCodeSizeAndColor(code, size, color);
        }

        [Authorize]
        [Route("inventary")]
        [HttpGet]
        public IEnumerable<Dress> GetAllDresses()
        {
            return objproduct.GetAllDresses();
        }

        [Authorize]
        [Route("inventary/delete/{code}/{size}/{color}")]
        [HttpDelete]
        public bool DeleteDress(string code, string size, string color)
        {
            return objproduct.DeleteDress(code, size, color);
        }

        [Authorize]
        [Route("inventary/add")]
        [HttpPost]
        //public bool AddDress(string code, string name, string size, int quantity, double price, string color, string material, string description, string supplier)
        public bool AddDress([FromBody] Dress dress)
        {
            //Dress dress = new Dress(code, name, size, quantity, price, color, material, description, supplier);
            return objproduct.AddDress(dress);
            //return true;
        }

        [Authorize]
        [Route("inventary/update/{code}/{size}/{color}")]
        [HttpPut]
        //public bool AddDress(string code, string name, string size, int quantity, double price, string color, string material, string description, string supplier)
        public bool UpdateDress(string code, string size, string color, [FromBody] Dress dress)
        {
            //Dress dress = new Dress(code, name, size, quantity, price, color, material, description, supplier);
            return objproduct.UpdateDress(dress, code, size, color);
            //return true;
        }


    }
}
