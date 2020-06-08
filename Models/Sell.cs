using System;
using System.Collections.Generic;

namespace WebApiBiusoProject.Models
{
    public partial class Sell
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public int Quantity { get; set; }
        public double Priceold { get; set; }
        public double Pricenew { get; set; }
        public string Color { get; set; }
        public List<string> Material { get; set; }
        public string Description { get; set; }
        public string Supplier { get; set; }
        public DateTime Dateofsale { get; set; }

        public virtual Supplier SupplierNavigation { get; set; }
    }
}
