using Microsoft.EntityFrameworkCore.Migrations;
using NodaTime;

namespace CountBookBackend.Data.Migrations
{
    public partial class RecordDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<LocalDate>(
                name: "Date",
                table: "Record",
                nullable: false,
                defaultValue: new NodaTime.LocalDate(1, 1, 1));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Record");
        }
    }
}
