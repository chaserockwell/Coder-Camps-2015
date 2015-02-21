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
    public class KidChoresController : Controller
    {
        private KidChoreDbContext db = new KidChoreDbContext();

        // GET: KidChores
        public ActionResult Index()
        {
            var kidChores = db.KidChores.Include(k => k.Chore).Include(k => k.Kid);
            return View(kidChores.ToList());
        }

        // GET: KidChores/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KidChore kidChore = db.KidChores.Find(id);
            if (kidChore == null)
            {
                return HttpNotFound();
            }
            return View(kidChore);
        }

        // GET: KidChores/Create
        public ActionResult Create()
        {
            ViewBag.ChoreId = new SelectList(db.Chores, "ChoreId", "ChoreName");
            ViewBag.KidId = new SelectList(db.Kids, "KidId", "FirstName");
            return View();
        }

        // POST: KidChores/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "KidChoreId,KidId,ChoreId")] KidChore kidChore)
        {
            if (ModelState.IsValid)
            {
                db.KidChores.Add(kidChore);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ChoreId = new SelectList(db.Chores, "ChoreId", "ChoreName", kidChore.ChoreId);
            ViewBag.KidId = new SelectList(db.Kids, "KidId", "FirstName", kidChore.KidId);
            return View(kidChore);
        }

        // GET: KidChores/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KidChore kidChore = db.KidChores.Find(id);
            if (kidChore == null)
            {
                return HttpNotFound();
            }
            ViewBag.ChoreId = new SelectList(db.Chores, "ChoreId", "ChoreName", kidChore.ChoreId);
            ViewBag.KidId = new SelectList(db.Kids, "KidId", "FirstName", kidChore.KidId);
            return View(kidChore);
        }

        // POST: KidChores/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "KidChoreId,KidId,ChoreId")] KidChore kidChore)
        {
            if (ModelState.IsValid)
            {
                db.Entry(kidChore).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ChoreId = new SelectList(db.Chores, "ChoreId", "ChoreName", kidChore.ChoreId);
            ViewBag.KidId = new SelectList(db.Kids, "KidId", "FirstName", kidChore.KidId);
            return View(kidChore);
        }

        // GET: KidChores/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KidChore kidChore = db.KidChores.Find(id);
            if (kidChore == null)
            {
                return HttpNotFound();
            }
            return View(kidChore);
        }

        // POST: KidChores/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            KidChore kidChore = db.KidChores.Find(id);
            db.KidChores.Remove(kidChore);
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
