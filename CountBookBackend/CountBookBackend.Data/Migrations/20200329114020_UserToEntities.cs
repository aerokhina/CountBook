using Microsoft.EntityFrameworkCore.Migrations;

namespace CountBookBackend.Data.Migrations
{
    public partial class UserToEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "ShoppingItem",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Record",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Category",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingItem_ApplicationUserId",
                table: "ShoppingItem",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Record_ApplicationUserId",
                table: "Record",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Category_ApplicationUserId",
                table: "Category",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_AspNetUsers_ApplicationUserId",
                table: "Category",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Record_AspNetUsers_ApplicationUserId",
                table: "Record",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingItem_AspNetUsers_ApplicationUserId",
                table: "ShoppingItem",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_AspNetUsers_ApplicationUserId",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Record_AspNetUsers_ApplicationUserId",
                table: "Record");

            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingItem_AspNetUsers_ApplicationUserId",
                table: "ShoppingItem");

            migrationBuilder.DropIndex(
                name: "IX_ShoppingItem_ApplicationUserId",
                table: "ShoppingItem");

            migrationBuilder.DropIndex(
                name: "IX_Record_ApplicationUserId",
                table: "Record");

            migrationBuilder.DropIndex(
                name: "IX_Category_ApplicationUserId",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "ShoppingItem");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Record");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Category");
        }
    }
}
