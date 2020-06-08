using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using WebApiBiusoProject.Models;

namespace prova_marika_7.Modelsnamespace 
{
    public class DressAccessLayer
    {

        public async Task<Dress> GetDressValidity(string code, string size, string color)
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    return await db.Dress.SingleAsync(a => a.Code == code && a.Size == size && a.Color == color);
                }
                catch
                {
                    return new Dress("INVALID");
                }

            }
        }
        public async Task<IEnumerable<Dress>> GetAllDresses()
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    return await db.Dress.ToListAsync();
                }
                catch
                {
                    throw;
                }
            }
        }

        public async Task<bool> DeleteDress(string code, string size, string color)
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    Dress dressToDelete = await db.Dress.SingleAsync(a => a.Code == code && a.Size == size && a.Color == color);
                    
                    //db.Dress.Remove(dressToDelete);
                    Supplier supplier = await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == dressToDelete.Supplier);
                    supplier.Dress.Remove(dressToDelete);
                    await db.SaveChangesAsync();

                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }

        public async Task<bool> AddDress(Dress dress)
        {
            
            try
            {
                
                using (var db = new biusoprojectContext())
                {
                    //Supplier supplier = await GetSupplierFromName(dress.Supplier); // <-- intervieni qua
                    Supplier supplier = await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == dress.Supplier);
                    //dress.SupplierNavigation = supplier;
                    supplier.Dress.Add(dress);
                    //await db.Dress.AddAsync(dress);
                    db.SaveChanges();   //todo prova questo

                }
                return true;
                
                    
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
            
        }

        public async Task<bool> UpdateDress(Dress dress, string code, string size, string color)
        {
            using (var db = new biusoprojectContext())
            {
                using (var transaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        Dress dressToUpdate = await db.Dress.SingleAsync(a => a.Code == code && a.Size == size && a.Color == color);
                        if (dressToUpdate.Code == dress.Code && dressToUpdate.Size == dress.Size && dressToUpdate.Color == dress.Color)
                        {
                            if (dressToUpdate.Supplier == dress.Supplier)
                            {
                                dressToUpdate.Name = dress.Name;
                                dressToUpdate.Quantity = dress.Quantity;
                                dressToUpdate.Material = dress.Material;
                                dressToUpdate.Description = dress.Description;

                                //    Supplier supplier = await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == dress.Supplier);
                                //    supplier.Dress.Remove(dressToUpdate);
                                //    supplier.Dress.Add(dress);
                            }
                            else
                            {
                                Supplier supplierNew = await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == dress.Supplier);
                                dressToUpdate.Supplier = supplierNew.Name;
                                //Supplier supplierNew = await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == dress.Supplier);
                                //Supplier supplierOld = await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == dressToUpdate.Supplier);
                                //supplierOld.Dress.Remove(dressToUpdate);
                                //supplierNew.Dress.Add(dress);


                            }
                        }
                        else
                        {
                            if (dressToUpdate.Supplier == dress.Supplier) // <-- not work
                            {

                                Supplier supplier = await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == dress.Supplier);
                                supplier.Dress.Remove(dressToUpdate); 
                                supplier.Dress.Add(dress);
                            }
                            else // <-- not work
                            {

                                Supplier supplierNew = await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == dress.Supplier);
                                Supplier supplierOld = await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == dressToUpdate.Supplier);
                                db.Dress.Remove(dressToUpdate);
                                supplierNew.Dress.Add(dress);


                            }
                        }
                        
                                             
                        transaction.Commit();
                        db.SaveChanges();
                            
                        return true;
                        
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }

        public async Task<bool> SellDress(Dress dress, int quantity, DateTime date)
        {
            using (var db = new biusoprojectContext())
            {
                using (var transaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        int newQuantity = dress.Quantity - quantity;

                        if(newQuantity < 0)
                            return false;

                        Sell sell = new Sell();
                        sell.Code = dress.Code;
                        sell.Size = dress.Size;
                        sell.Name = dress.Name;
                        sell.Pricenew = dress.Price;
                        sell.Priceold = dress.Price;
                        sell.Quantity = quantity;
                        sell.Color = dress.Color;
                        sell.Material = dress.Material;
                        sell.Description = dress.Description;
                        sell.Supplier = dress.Supplier;
                        sell.Dateofsale = date;

                        if (newQuantity == 0)
                        {              
                            // elimina il dress dall'inventario
                            db.Dress.Remove(dress);             
                        }
                        else
                        {
                            // modifica il dress dall'inventario
                            Dress dressToUpdate = await db.Dress.SingleAsync(a => a.Code == dress.Code && a.Size == dress.Size && a.Color == dress.Color);

                            dressToUpdate.Quantity = newQuantity;   
                        }
                        // add row in sell

                        Supplier supplier = await db.Supplier.Include(b => b.Sell).SingleAsync(a => a.Name == dress.Supplier);
                        //dobbiamo vedere esiste già un prodotto venduto lo stesso giorno 

                        Sell oldSell = db.Sell.SingleOrDefault(a => a.Code == sell.Code && a.Size == sell.Size && a.Color == sell.Color && a.Dateofsale == sell.Dateofsale);
                        if (oldSell != null)
                        {
                            oldSell.Quantity = oldSell.Quantity + sell.Quantity;
                        }
                        else
                        {
                            supplier.Sell.Add(sell);
                        }
                        transaction.Commit();
                        db.SaveChanges();
                        return true;
                    }
                    catch
                    {
                        transaction.Rollback();
                        return false;
                    }
                }
            }
        }

        public async Task<Supplier> GetSupplierFromName(string name)
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    return await db.Supplier.Include(b => b.Dress).SingleAsync(a => a.Name == name);
                }
                catch
                {
                    return new Supplier("INVALID");
                }

            }
        }
    }
}
