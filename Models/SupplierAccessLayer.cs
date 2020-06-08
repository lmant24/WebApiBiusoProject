using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiBiusoProject.Models
{
    public class SupplierAccessLayer
    {
        public async Task<IEnumerable<Supplier>> GetAllSuppliers()
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    return await db.Supplier.ToListAsync();
                }
                catch
                {
                    throw;
                }
            }
        }

        public async Task<bool> AddSupplier(Supplier supplier)
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    db.Supplier.Add(supplier);
                    await db.SaveChangesAsync();
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
