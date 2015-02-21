namespace KidChores.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class INITIAL : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Chores",
                c => new
                    {
                        ChoreId = c.Int(nullable: false, identity: true),
                        ChoreName = c.String(),
                    })
                .PrimaryKey(t => t.ChoreId);
            
            CreateTable(
                "dbo.KidChores",
                c => new
                    {
                        KidChoreId = c.Int(nullable: false, identity: true),
                        KidId = c.Int(nullable: false),
                        ChoreId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.KidChoreId)
                .ForeignKey("dbo.Chores", t => t.ChoreId, cascadeDelete: true)
                .ForeignKey("dbo.Kids", t => t.KidId, cascadeDelete: true)
                .Index(t => t.KidId)
                .Index(t => t.ChoreId);
            
            CreateTable(
                "dbo.Kids",
                c => new
                    {
                        KidId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                    })
                .PrimaryKey(t => t.KidId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.KidChores", "KidId", "dbo.Kids");
            DropForeignKey("dbo.KidChores", "ChoreId", "dbo.Chores");
            DropIndex("dbo.KidChores", new[] { "ChoreId" });
            DropIndex("dbo.KidChores", new[] { "KidId" });
            DropTable("dbo.Kids");
            DropTable("dbo.KidChores");
            DropTable("dbo.Chores");
        }
    }
}
