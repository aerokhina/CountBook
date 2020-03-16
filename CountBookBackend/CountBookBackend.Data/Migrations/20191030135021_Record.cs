using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CountBookBackend.Data.Migrations
{
  public partial class Record : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
        "Record",
        table => new
        {
          Id = table.Column<int>()
            .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
          Type = table.Column<int>(),
          Name = table.Column<string>(nullable: true),
          Amount = table.Column<decimal>()
        },
        constraints: table => { table.PrimaryKey("PK_Record", x => x.Id); });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
        "Record");
    }
  }
}
