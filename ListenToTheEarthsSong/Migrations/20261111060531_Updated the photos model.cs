using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ListenToTheEarthsSong.Data.Migrations
{
    /// <inheritdoc />
    public partial class Updatedthephotosmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Photos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Photos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "PasswordHash", "Username" },
                values: new object[,]
                {
                    { 1, "milkoivan@gmail.com", "1eae2a349582cb4beadd0c6a02bcf6a0e18c6e524a0c80a8ef16acdff232ab6c", "Ivan Milev" },
                    { 2, "maria.petrova@gmail.com", "b07e99c422b344c835ddfad0084d1b05999388150e245515a3f93d3d97eae1fd", "Maria Petrova" },
                    { 3, "kirpetrov@gmail.com", "673c2ec6801a14e46fc7367bf9f53bc638b231efcfe71aa8c153df2de9cb5895", "Kircho Petrov" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Photos");
        }
    }
}
