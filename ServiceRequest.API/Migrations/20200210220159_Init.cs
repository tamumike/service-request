using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceRequest.API.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    CommentID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequestID = table.Column<string>(nullable: true),
                    Author = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.CommentID);
                });

            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    RequestID = table.Column<string>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    RequestDate = table.Column<DateTime>(nullable: false),
                    Location = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Deliverables = table.Column<string>(nullable: false),
                    AFE = table.Column<string>(nullable: true),
                    PropertyCode = table.Column<int>(nullable: true),
                    EngineerAssigned = table.Column<string>(nullable: true),
                    PromiseDate = table.Column<DateTime>(nullable: true),
                    Approved = table.Column<bool>(nullable: false),
                    Submitted = table.Column<bool>(nullable: false),
                    ApprovedBudget = table.Column<decimal>(nullable: false),
                    ExpectedCost = table.Column<decimal>(nullable: true),
                    CoupaDate = table.Column<DateTime>(nullable: true),
                    Status = table.Column<string>(nullable: false),
                    Acknowledged = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.RequestID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Requests");
        }
    }
}
