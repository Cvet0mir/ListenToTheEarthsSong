using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ListenToTheEarthsSong.Data.Helpers
{
    public static class PasswordHasher
    {
        public static string ComputeSha256(string text)
        {
            byte[] inputBytes = Encoding.UTF8.GetBytes(text);
            byte[] hashBytes = SHA256.HashData(inputBytes);

            return Convert.ToHexString(hashBytes).ToLowerInvariant();
        }
    }
}
