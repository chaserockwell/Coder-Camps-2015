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
    public class ChoresController : Controller
    {
        private KidChoreDbContext db = new KidChoreDbContext();

        // GET: Chores
        public ActionResult Index()
        {
            return View(db.Chores.ToList());
        }

        // GET: Chores/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Chore chore = db.Chores.Find(id);
            if (chore == null)
            {
                return HttpNotFound();
            }
            return View(chore);
        }

        // GET: Chores/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Chores/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ChoreId,ChoreName")] Chore chore)
        {
            if (ModelState.IsValid)
            {
                db.Chores.Add(chore);
                db.SaveChanges();
                return RedirectToAction("Index", "KidChores");
            }

            return View(chore);
        }

        // GET: Chores/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Chore chore = db.Chores.Find(id);
            if (chore == null)
            {
                return HttpNotFound();
            }
            return View(chore);
        }

        // POST: Chores/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ChoreId,ChoreName")] Chore chore)
        {
            if (ModelState.IsValid)
            {
                db.Entry(chore).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(chore);
        }

        // GET: Chores/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Chore chore = db.Chores.Find(id);
            if (chore == null)
            {
                return HttpNotFound();
            }
            return View(chore);
        }

        // POST: Chores/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Chore chore = db.Chores.Find(id);
            db.Chores.Remove(chore);
            db.SaveChanges();
            return RedirectToAction("Index", "Kidchores");
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
