using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiBiusoProject.Models
{
    public class SupplierAccessLayer
    {
        public IEnumerable<Supplier> GetAllSuppliers()
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    return db.Supplier.ToList();
                }
                catch
                {
                    throw;
                }
            }
        }

        public bool AddSupplier(Supplier supplier)
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    db.Supplier.Add(supplier);
                    return true;
                }
                catch
                {
                    throw;
                }
            }
        }
    }
}
