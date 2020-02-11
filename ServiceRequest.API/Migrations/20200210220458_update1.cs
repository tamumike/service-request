using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceRequest.API.Migrations
{
    public partial class update1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "ApprovedBudget",
                table: "Requests",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldDefaultValue: 25000m);

            migrationBuilder.AlterColumn<string>(
                name: "RequestID",
                table: "Comments",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_RequestID",
                table: "Comments",
                column: "RequestID");

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
                name: "FK_Comments_Requests_RequestID",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_RequestID",
                table: "Comments");

            migrationBuilder.AlterColumn<decimal>(
                name: "ApprovedBudget",
                table: "Requests",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 25000m,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<string>(
                name: "RequestID",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
