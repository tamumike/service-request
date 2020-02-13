using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceRequest.API.Migrations
{
    public partial class AddAttachments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RequestID",
                table: "Attachments",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_RequestID",
                table: "Attachments",
                column: "RequestID");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_Requests_RequestID",
                table: "Attachments",
                column: "RequestID",
                principalTable: "Requests",
                principalColumn: "RequestID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_Requests_RequestID",
                table: "Attachments");

            migrationBuilder.DropIndex(
                name: "IX_Attachments_RequestID",
                table: "Attachments");

            migrationBuilder.AlterColumn<string>(
                name: "RequestID",
                table: "Attachments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
