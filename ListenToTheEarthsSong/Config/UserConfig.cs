using ListenToTheEarthsSong.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListenToTheEarthsSong.Data.Config
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData(
                new User
                {
                    Id = 1,
                    Username = "Ivan Milev",
                    Email = "milkoivan@gmail.com",
                    PasswordHash = "1eae2a349582cb4beadd0c6a02bcf6a0e18c6e524a0c80a8ef16acdff232ab6c"
                },
                new User
                {
                    Id = 2,
                    Username = "Maria Petrova",
                    Email = "maria.petrova@gmail.com",
                    PasswordHash = "b07e99c422b344c835ddfad0084d1b05999388150e245515a3f93d3d97eae1fd"
                },
                new User
                {
                    Id = 3,
                    Username = "Kircho Petrov",
                    Email = "kirpetrov@gmail.com",
                    PasswordHash = "673c2ec6801a14e46fc7367bf9f53bc638b231efcfe71aa8c153df2de9cb5895"
                });
        }
    }
}
