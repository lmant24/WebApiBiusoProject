using System;
using System.Collections.Generic;

namespace WebApiBiusoProject.Models
{
    public partial class Supplier
    {
        public Supplier()
        {
            Dress = new HashSet<Dress>();
        }
        public Supplier(string name)
        {
            this.Name = name;
            Dress = new HashSet<Dress>();
        }

        public string Name { get; set; }

        public virtual ICollection<Dress> Dress { get; set; }
    }
}
