using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiBiusoProject.Models;

namespace prova_marika_7.Modelsnamespace 
{
    public class DressAccessLayer
    {

        public Dress GetDressFromCodeSizeAndColor(string code, string size, string color)
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    return db.Dress.Single(a => a.Code == code && a.Size == size && a.Color == color);
                }
                catch
                {
                    return new Dress("invalid");
                }

            }
        }
        public IEnumerable<Dress> GetAllDresses()
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    return db.Dress.ToList();
                }
                catch
                {
                    throw;
                }
            }
        }

        public bool DeleteDress(string code, string size, string color)
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    Dress dressToDelete = GetDressFromCodeSizeAndColor(code, size, color);
                    db.Dress.Remove(dressToDelete);
                    db.SaveChanges();

                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }

        internal bool AddDress(Dress dress)
        {
            using (var db = new biusoprojectContext())
            {
                try
                {
                    Dress dressExists = GetDressFromCodeSizeAndColor(dress.Code, dress.Size, dress.Color);
                    if (dressExists.isValid())
                    {
                        Console.WriteLine("Dress " + dress.ToString() + " exists: updating...");
                        if (!UpdateDress(dress, dress.Code, dress.Size, dress.Color))
                            return true;
                        else
                        {
                            Console.WriteLine("Exception: updating operation failed");
                            return false;
                        }
                    }
                    else
                    {
                        db.Dress.Add(dress);
                        db.SaveChanges();
                        return true;
                    }
                    
                }
                catch(Exception e)
                {
                    Console.WriteLine(e.Message);
                    throw;
                }
            }
        }

        internal bool UpdateDress(Dress dress, string code, string size, string color)
        {
            using (var db = new biusoprojectContext())
            {
                using (var transaction = db.Database.BeginTransaction())
                {
                    try
                    {

                        Dress dressToUpdate = GetDressFromCodeSizeAndColor(code, size, color);
                        if (dressToUpdate.isValid())
                        {
                            db.Dress.Remove(dressToUpdate);
                            db.Dress.Add(dress);
                            db.SaveChanges();
                            transaction.Commit();
                            return true;
                        }
                        return false;
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }
    }
}
