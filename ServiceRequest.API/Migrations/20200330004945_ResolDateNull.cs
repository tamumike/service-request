using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceRequest.API.Migrations
{
    public partial class ResolDateNull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ResolutionDate",
                table: "Requests",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ResolutionDate",
                table: "Requests",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);
        }
    }
}
