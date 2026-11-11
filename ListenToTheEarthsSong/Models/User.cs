using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListenToTheEarthsSong.Data.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Потребителското име е задължително.")]
        [MaxLength(150, ErrorMessage = "Потребителското име не може да бъде по-дълго от 150 символа.")]
        [MinLength(3, ErrorMessage = "Потребителското име трябва да съдържа поне 3 символа.")]
        public string Username { get; set; } = null!;

        [Required(ErrorMessage = "Имейл адресът е задължителен.")]
        [EmailAddress(ErrorMessage = "Моля, въведете валиден имейл адрес.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Паролата е задължителна.")]
        [MinLength(8, ErrorMessage = "Паролата трябва да съдържа поне 8 символа.")]
        public string PasswordHash { get; set; } = null!;

        public ICollection<Photo> Photos { get; set; } = new List<Photo>();
    }
}