using KidChores.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KidChores.Data
{
    public class KidChoreDbContext : DbContext
    {
        public KidChoreDbContext() : base("KidChoreConnection") { }
        public DbSet<Kid> Kids { get; set; }
        public DbSet<Chore> Chores { get; set; }
        public DbSet<KidChore> KidChores { get; set; }
    }
}
