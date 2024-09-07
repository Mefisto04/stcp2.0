// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");
// const fs = require("fs");

// async function scrapePage(url, results = []) {
//   console.log(`Scraping ${url}...`);
  
//   const browser = await puppeteer.launch({
//     headless: false, // Run the browser in non-headless mode
//   });
//   const page = await browser.newPage();
//   await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:73.0) Gecko/20100101 Firefox/73.0");
//   await page.goto(url);

//   const data = await page.content();
//   const $ = cheerio.load(data);

//   // Extract data
//   $("tr").each((i, row) => {
//     const rank = $(row).find("td.dark.left").text().trim();
//     const name = $(row).find("td.contestant-cell.dark a").text().trim();
//     const questionsSolved = $(row).find("td.dark").eq(2).text().trim();
//     //all question solved by perticular user
//     const solved_time = $(row).find("td.dark").eq(3).text().trim(); 

//     if (rank && name && questionsSolved) {
//       results.push({ rank, name, questionsSolved });
//     }
//   });

//   await browser.close();
//   return results;
// }

// async function scrapeAllPages(baseUrl, totalPages) {
//   let results = [];
  
//   for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
//     const url = `${baseUrl}/page/${pageIndex}`;
//     results = await scrapePage(url, results);
//   }

//   // Save the data to a JSON file
//   fs.writeFileSync("data.json", JSON.stringify(results, null, 2));
  
//   console.log("Data scraped and saved to data.json");
// }

// // Usage
// const baseUrl = "https://codeforces.com/group/aChfCtpDki/contest/547887/standings/groupmates/true";
// const totalPages = 1; // Set this to the total number of pages you want to scrape
// scrapeAllPages(baseUrl, totalPages).catch(err => {
//   console.error(err);
// });


const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

async function scrapePage(url, results = []) {
  console.log(`Scraping ${url}...`);
  
  const browser = await puppeteer.launch({
    headless: false, // Run the browser in non-headless mode
  });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:73.0) Gecko/20100101 Firefox/73.0");
  await page.goto(url);

  const data = await page.content();
  const $ = cheerio.load(data);

  $("tr").each((i, row) => {
    const rank = $(row).find("td.dark.left").text().trim();
    const name = $(row).find("td.contestant-cell.dark a").text().trim();
    const solvedProblems = [];

    $(row).find("td[contestid]").each((j, problemCell) => {
      const problemTitle = $(problemCell).attr("title");
      const solvedTime = $(problemCell).find(".cell-time").text().trim();
      if (problemTitle && solvedTime) {
        solvedProblems.push({
          problem: problemTitle,
          solved_time: solvedTime
        });
      }
    });

    const solvedCount = solvedProblems.length;

    if (rank && name && solvedCount > 0) {
      results.push({
        handle: name,
        solved_count: solvedCount,
        solved_problems: solvedProblems,
        rank: parseInt(rank, 10) // Convert rank to integer
      });
    }
  });

  await browser.close();
  return results;
}

async function scrapeAllPages(baseUrl, totalPages) {
  let results = [];
  
  for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
    const url = `${baseUrl}/page/${pageIndex}`;
    results = await scrapePage(url, results);
  }

  // Save the data to a JSON file
  fs.writeFileSync("data/final.json", JSON.stringify(results, null, 2));
  
  console.log("Data scraped and saved to data.json");
}

// Usage
const baseUrl = "https://codeforces.com/group/aChfCtpDki/contest/547887/standings/groupmates/true";
const totalPages = 13; // Set this to the total number of pages you want to scrape
scrapeAllPages(baseUrl, totalPages).catch(err => {
  console.error(err);
});
