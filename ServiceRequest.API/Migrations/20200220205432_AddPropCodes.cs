using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceRequest.API.Migrations
{
    public partial class AddPropCodes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_Requests_RequestID",
                table: "Attachments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Requests_RequestID",
                table: "Comments");

            migrationBuilder.CreateTable(
                name: "PropertyCodes",
                columns: table => new
                {
                    Code = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyCodes", x => x.Code);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_Requests_RequestID",
                table: "Attachments",
                column: "RequestID",
                principalTable: "Requests",
                principalColumn: "RequestID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Requests_RequestID",
                table: "Comments",
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

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Requests_RequestID",
                table: "Comments");

            migrationBuilder.DropTable(
                name: "PropertyCodes");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_Requests_RequestID",
                table: "Attachments",
                column: "RequestID",
                principalTable: "Requests",
                principalColumn: "RequestID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Requests_RequestID",
                table: "Comments",
                column: "RequestID",
                principalTable: "Requests",
                principalColumn: "RequestID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
