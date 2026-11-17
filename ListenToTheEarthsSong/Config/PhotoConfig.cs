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
    public class PhotoConfig : IEntityTypeConfiguration<Photo>
    {
        public void Configure(EntityTypeBuilder<Photo> builder)
        {
            builder.HasData(new Photo
            {
                Id = 1,
                ImgName = "Улица в Ню Йорк",
                ImgUrl = "C:\\Users\\11B_18\\source\\repos\\Cvet0mir\\ListenToTheEarthsSong\\ListenToTheEarthsSong.Server\\Img\\NewYorkStreet.jpg",
                Description = "Снимка на улица в Ню Йорк, САЩ.",
                UploadedAt = DateTime.Now,
                Category = Data.Enums.PhotoCategory.NoisyPlace,
                UploadedById = 1
            },
            new Photo
            {
                Id = 2,
                ImgName = "Езеро",
                ImgUrl = "C:\\Users\\11B_18\\source\\repos\\Cvet0mir\\ListenToTheEarthsSong\\ListenToTheEarthsSong.Server\\Img\\Lake.jpg",
                Description = "Снимка на улица в езеро.",
                UploadedAt = DateTime.Now,
                Category = Data.Enums.PhotoCategory.QuietPlace,
                UploadedById = 1
            },
            new Photo
            {
                Id = 3,
                ImgName = "Тиха гора",
                ImgUrl = "C:\\Users\\11B_18\\source\\repos\\Cvet0mir\\ListenToTheEarthsSong\\ListenToTheEarthsSong.Server\\Img\\Forest.jpg",
                Description = "Снимка на гора.",
                UploadedAt = DateTime.Now,
                Category = Data.Enums.PhotoCategory.Nature,
                UploadedById = 2
            });
        }
    }
}
