using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Bacchus.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Bacchus.Controllers
{
    [Produces("application/json")]
    [Route("api")]
    public class APIController : Controller
    {
        [Route("auctions")]
        [HttpGet]
        public List<Auction> GetAuctions()
        {

            var client = new WebClient();
            client.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

            var response = client.DownloadString("http://uptime-auction-api.azurewebsites.net/api/Auction");

            var releases = JArray.Parse(response);
            var auctions = releases.ToObject<List<Auction>>();
            // List<Auction> auctions = releases;
            return auctions;
        }
    }
}