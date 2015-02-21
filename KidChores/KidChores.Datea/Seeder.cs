using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Migrations;
using KidChores.Data.Models;

namespace KidChores.Data
{
    public class Seeder
    {
        public static void Seed(KidChoreDbContext db)
        {
            db.Chores.AddOrUpdate(c => c.ChoreId,
                new Chore { ChoreName = "Sweep." },
                new Chore { ChoreName = "Take out the trash." },
                new Chore { ChoreName = "Clean the bathroom." },
                new Chore { ChoreName = "Mop." }
                );

            db.Kids.AddOrUpdate(k => k.KidId,
                new Kid { FirstName = "Dylan", LastName = "Stockdale" },
                new Kid { FirstName = "Chance", LastName = "Vignetti"},
                new Kid { FirstName = "Angela", LastName = "Madsen"},
                new Kid { FirstName = "Karli", LastName = "Orton"}
                );

            db.KidChores.AddOrUpdate(kc => kc.KidChoreId,
                new KidChore { KidId = 1, ChoreId = 3 },
                new KidChore { KidId = 1, ChoreId = 2 },
                new KidChore { KidId = 3, ChoreId = 3 },
                new KidChore { KidId = 4, ChoreId = 1 },
                new KidChore { KidId = 1, ChoreId = 4 },
                new KidChore { KidId = 4, ChoreId = 4 },
                new KidChore { KidId = 2, ChoreId = 2 }
                );
            db.SaveChanges();
        }
    }
}
