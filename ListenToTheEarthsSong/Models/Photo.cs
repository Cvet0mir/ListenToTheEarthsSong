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

        [Required]
        public string ImgName { get; set; } = null!;

        [Required]
        public string ImgUrl { get; set; } = null!;

        [Required]
        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string Description { get; set; } = null!;

        [Required]
        public DateTime UploadedAt { get; set; }

        [Required]
        public PhotoCategory Category { get; set; }

        public int UploadedById { get; set; }

        public User UploadedBy { get; set; }
    }
}
