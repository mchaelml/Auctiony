using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bacchus.Models
{
    public class Auction
    {
        public string productName { get; set; }
        public string productId { get; set; }
        public string productDescription { get; set; }
        public string productCategory { get; set; }
        public DateTime biddingEndDate { get; set; }
    }
}
