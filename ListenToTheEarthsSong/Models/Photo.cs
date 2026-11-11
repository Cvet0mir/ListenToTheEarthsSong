using ListenToTheEarthsSong.Data.Enums;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListenToTheEarthsSong.Data.Models
{
    public class Photo
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Името на изображението е задължително.")]
        public string ImgName { get; set; } = null!;

        [Required(ErrorMessage = "Линкът към изображението е задължителен.")]
        public string ImgUrl { get; set; } = null!;

        [Required(ErrorMessage = "Описанието е задължително.")]
        [StringLength(500, ErrorMessage = "Описанието не може да бъде по-дълго от 500 символа.")]
        public string Description { get; set; } = null!;

        [Required(ErrorMessage = "Датата на качване е задължителна.")]
        public DateTime UploadedAt { get; set; }

        [Required(ErrorMessage = "Категорията е задължителна.")]
        public PhotoCategory Category { get; set; }

        public int UploadedById { get; set; }

        public User UploadedBy { get; set; }
    }
}