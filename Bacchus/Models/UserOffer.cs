using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bacchus.Models
{
    public class UserOffer
    {
        [Key]
        public int Id { get; set; }
        public string userId { get; set; }
        public string productId { get; set; }
        public double Offer { get; set; }
        public DateTime? endTime { get; set; }
    }
}
