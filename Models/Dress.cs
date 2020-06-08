using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace WebApiBiusoProject.Models
{
    public partial class Dress
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string Color { get; set; }
        public List<string> Material { get; set; } //Maybe is a Set<string>
        public string Description { get; set; }
        public string Supplier { get; set; }

        public virtual Supplier SupplierNavigation { get; set; }

         public Dress(string code)
        {
            this.Code = code.ToUpper();
        }

        public bool isValid()
        {
            if (Code != "INVALID")
                return true;
            else return false;
        }

        [JsonConstructor]
        public Dress(string code, string name, string size, int quantity, double price, string color, List<string> material, string description, string supplier)
        {
            this.Code = code.ToUpper();
            this.Name = name;
            this.Size = size;
            this.Quantity = quantity;
            this.Price = price;
            this.Color = color;
            this.Material = material;
            this.Description = description;
            this.Supplier = supplier;
        }
    }
}
