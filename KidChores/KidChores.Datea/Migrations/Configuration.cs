namespace KidChores.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<KidChores.Data.KidChoreDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(KidChores.Data.KidChoreDbContext context)
        {
            Seeder.Seed(context);
        }
    }
}
