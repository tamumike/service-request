using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceRequest.API.Migrations
{
    public partial class CommentResolution : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Resolution",
                table: "Comments",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Resolution",
                table: "Comments");
        }
    }
}
