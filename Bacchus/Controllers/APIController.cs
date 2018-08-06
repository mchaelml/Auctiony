using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Bacchus.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Bacchus.Controllers
{
    [Produces("application/json")]
    [Route("api")]
    public class APIController : Controller
    {

        private NDbContext _context;
        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }

        public APIController(NDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("winners")]
        public List<UserOffer> Bids()
        {
            // make sure to display only the finished auctions (excluding ongoing)
            var list = _context.Offers.Where(z => z.endTime < DateTime.Now).GroupBy(x => x.productId).Select(x => x.OrderBy(y => y.Offer).LastOrDefault()).ToList();
               

            return list;
        }

        [HttpPost]
        [Route("newOffer")]
        public IActionResult AddNewOffer([FromBody] UserOffer offer)
        {
            try
            {
                if (offer != null)
                {
                    var newoffer = new UserOffer
                    {
                        Offer = offer.Offer,
                        productId = offer.productId,
                        userId = offer.userId + DateTime.Now.ToString("yyyyMMddHHmmss"),
                        endTime = offer.endTime.Value.AddHours(3)

                    };
                    _context.Offers.Add(newoffer);
                }
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [Route("clist")]
        [HttpGet]
        public IActionResult GetCategories()
        {
            try
            {
                var client = new WebClient();
                client.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

                var response = client.DownloadString("http://uptime-auction-api.azurewebsites.net/api/Auction");

                var releases = JArray.Parse(response);
                var auctions = releases.ToObject<List<Auction>>();
                return Ok(auctions);
            }catch(Exception e)
            {
                return BadRequest(e);
            }
        }
        [Route("auctions/{column}/{filter}/{desc}/{name}/{endDate}/{category}")]
        [HttpGet]
        public List<Auction> GetAuctions([FromRoute] string column, [FromRoute] string filter, [FromRoute] bool desc, [FromRoute] string name,[FromRoute] DateTime endDate,[FromRoute] string category)
        {
            IList<Auction> li = new List<Auction>();
            IList<Auction> list = null;
            IQueryable<Auction> qList;
            IEnumerable<Auction> orderedReports = null;
            var client = new WebClient();
            client.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

            var response = client.DownloadString("http://uptime-auction-api.azurewebsites.net/api/Auction");

            var releases = JArray.Parse(response);
            var auctions = releases.ToObject<List<Auction>>();
            // List<Auction> auctions = releases;
            list = auctions;
            if (category != "%20")
            {
                List<string> categoryL = category.Split(",").ToList();

                if (categoryL.Count() > 1)
                {

                    foreach (var item in categoryL)
                    {

                        li = li.Union(li = auctions.Where(x => x.productCategory.TrimEnd().Equals(item.TrimEnd())).ToList()).ToArray();

                    }
                    list = li;
                }
            }
            if (!string.IsNullOrEmpty(name))
            {

                list = list.Where(x => x.productName.ToLower().TrimEnd().Contains(name.ToLower().TrimEnd())).ToList();
            }
            if (endDate != null && endDate != DateTime.MinValue)
            {

                list = list.Where(x => x.biddingEndDate <= endDate).ToList();
            }

            if (list != null)
            {
                qList = list.AsQueryable<Auction>();

                if (column != null)
                {
                    // Ascending order
                    // if descend is null or false default to ascending
                    if (desc)
                    {
                        switch (column)
                        {
                            case "name":

                                orderedReports = qList.OrderBy(x => x.productName);
                                break;
                            case "description":

                                orderedReports = qList.OrderBy(x => x.productDescription);
                                break;
                            case "category":

                                orderedReports = qList.OrderBy(x => x.productCategory);
                                break;
                           

                            case "endDate":
                                orderedReports = qList.OrderBy(x => x.biddingEndDate);
                                break;


                        }
                    }
                    else // Descending
                    {
                        switch (column)
                        {
                            //case "id":
                            //    orderedReports = reports.OrderByDescending(x => x.BatchNumber);
                            //    break;
                            case "name":
                                orderedReports = qList.OrderByDescending(x => x.productName);
                                break;
                            case "description":

                                orderedReports = qList.OrderBy(x => x.productDescription);
                                break;
                            case "category":

                                orderedReports = qList.OrderBy(x => x.productCategory);
                                break;

                            case "endDate":
                                orderedReports = qList.OrderByDescending(x => x.biddingEndDate);
                                break;

                        }
                    }
                }
                else
                {
                    orderedReports = list.OrderBy(x => x.productName);
                }

                return orderedReports.ToList();

            }
            return auctions;
        }
    }
}