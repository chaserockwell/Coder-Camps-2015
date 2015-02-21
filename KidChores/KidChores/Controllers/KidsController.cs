using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using KidChores.Data;
using KidChores.Data.Models;

namespace KidChores.Controllers
{
    public class KidsController : Controller
    {
        private KidChoreDbContext db = new KidChoreDbContext();

        // GET: Kids
        public ActionResult Index()
        {
            return View(db.Kids.ToList());
        }

        // GET: Kids/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Kid kid = db.Kids.Find(id);
            if (kid == null)
            {
                return HttpNotFound();
            }
            return View(kid);
        }

        // GET: Kids/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Kids/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "KidId,FirstName,LastName")] Kid kid)
        {
            if (ModelState.IsValid)
            {
                db.Kids.Add(kid);
                db.SaveChanges();
                return RedirectToAction("Index", "KidChores");
            }

            return View(kid);
        }

        // GET: Kids/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Kid kid = db.Kids.Find(id);
            if (kid == null)
            {
                return HttpNotFound();
            }
            return View(kid);
        }

        // POST: Kids/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "KidId,FirstName,LastName")] Kid kid)
        {
            if (ModelState.IsValid)
            {
                db.Entry(kid).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index", "KidChores");
            }
            return View(kid);
        }

        // GET: Kids/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Kid kid = db.Kids.Find(id);
            if (kid == null)
            {
                return HttpNotFound();
            }
            return View(kid);
        }

        // POST: Kids/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Kid kid = db.Kids.Find(id);
            db.Kids.Remove(kid);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
