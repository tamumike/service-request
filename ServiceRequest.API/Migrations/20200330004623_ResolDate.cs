using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceRequest.API.Migrations
{
    public partial class ResolDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ResolutionDate",
                table: "Requests",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResolutionDate",
                table: "Requests");
        }
    }
}
