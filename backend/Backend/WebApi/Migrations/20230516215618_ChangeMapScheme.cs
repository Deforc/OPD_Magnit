using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class ChangeMapScheme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Building",
                table: "Maps",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Floor",
                table: "Maps",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_MapUsers_IdentityUserId",
                table: "MapUsers",
                column: "IdentityUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MapUsers_AspNetUsers_IdentityUserId",
                table: "MapUsers",
                column: "IdentityUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MapUsers_Maps_MapId",
                table: "MapUsers",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapUsers_AspNetUsers_IdentityUserId",
                table: "MapUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_MapUsers_Maps_MapId",
                table: "MapUsers");

            migrationBuilder.DropIndex(
                name: "IX_MapUsers_IdentityUserId",
                table: "MapUsers");

            migrationBuilder.DropColumn(
                name: "Building",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "Floor",
                table: "Maps");
        }
    }
}
