using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ListenToTheEarthsSong.Data.Models;
using ListenToTheEarthsSong.Data.Config;

namespace ListenToTheEarthsSong.Data
{
    public class EarthDbContext : DbContext
    {
        public EarthDbContext(DbContextOptions<EarthDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Photos)
                .WithOne(p => p.UploadedBy)
                .HasForeignKey(p => p.UploadedById)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new PhotoConfig());
        }
    }
}
