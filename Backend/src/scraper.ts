import fs from "fs";
import path from "path";
import axios from "axios";
import { z } from "zod";
import puppeteer from "puppeteer";
import natural, { TfIdf } from "natural"


export type Platform = "LeetCode" | "CodeForces" ;

interface Problem {
  name: string;
  url: string;
  platform:Platform
}
export interface TopicProblem extends Problem{
  tags:string[],
  difficulty:number |string | "n/a"
} 


const CORPUS_DIR = path.join(process.cwd(),"corpus")
const CACHE_FILE=path.join(CORPUS_DIR,"all_problems.json")

// function getCache(problemName: string) {
//   if (!fs.existsSync(CACHE_FILE)) return null;
//   const raw = fs.readFileSync(CACHE_FILE, "utf-8");
//   const cache: Record<string, Problem[]> = JSON.parse(raw);
//   return cache[problemName] || null;
// }

function updateCache(problemName: string, result: TopicProblem[]) {
  const dir = path.dirname(CACHE_FILE);
  if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
  }

  let cache: Record<string, TopicProblem[]> = {};
  if (fs.existsSync(CACHE_FILE)) {
    const raw = fs.readFileSync(CACHE_FILE, "utf-8");
    cache = JSON.parse(raw);
  }

  // Update cache
  cache[problemName] = result;

  // Write to file
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));

}


// export async function scrapeProblemsInLeetCode(limit = 50) {
// const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.setUserAgent(
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
//       "AppleWebKit/537.36 (KHTML, like Gecko) " +
//       "Chrome/114.0.5735.199 Safari/537.36"
//   );
// await page.goto("https://leetcode.com/problemset", { waitUntil: "domcontentloaded" });

//   const problemSelector ="a.group.flex.flex-col.rounded-\\[8px\\].duration-300.bg-fill-quaternary";

//   let problems: Problem[] = []
//   let prevCount = 0

// while (problems.length < limit){

//         await page.evaluate((sel)=>{
//             const nodes=document.querySelectorAll(sel)
//             if(nodes.length) nodes[nodes.length-1].scrollIntoView({behavior:"smooth"})
//         },problemSelector)

//         try {
//          await page.waitForFunction(
//           (selector,count)=>document.querySelectorAll(selector).length > count,
//            { timeout: 30000 },
//           problemSelector,
//           prevCount
//         )          
//         } catch (error) {
//           break
//         }

//         const newProblems=await page.evaluate((selector)=>{
//           return Array.from(document.querySelectorAll(selector)).map((element:any)=>{
//              const anchor = element.closest('a')
//             const titleEl = element.querySelector(".ellipsis.line-clamp-1");
//                     return {
//                         name: titleEl?.textContent?.trim() || "",
//                         url: anchor.href || "",
//                         platform:"LeetCode",
//                     };
//                     });
//         },problemSelector) as Problem[]


//        let freshProblems:Problem[]=newProblems.filter(p=> !getCache(p.name))
//        console.log(freshProblems)
//        problems.push(...freshProblems)

//       prevCount = await page.evaluate(sel => document.querySelectorAll(sel).length, problemSelector);

//   // Stop if no new problems were found
//       if (freshProblems.length === 0) break;

// }
//   await browser.close();

//       // problems.forEach((p)=>
//       // updateCache(p.name,[{
//       //     ...p
//       // }]))
//       console.log(problems)
//       console.log(`Saved ${problems.length} problems to ${CORPUS_DIR}`);

// }
// scrapeProblemsInLeetCode()

 
export async function  scrapeCodeForces(limit:number=50) {
const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/114.0.5735.199 Safari/537.36"
  );

  let codeforcesProblem:TopicProblem[]=[]
  let pageNumber=1

  while(codeforcesProblem.length < limit){
    const url=`https://codeforces.com/problemset/page/${pageNumber}`
    await page.goto(url, { waitUntil: "domcontentloaded" });

   const problemSelector = "table.problems tr"; 

const newProblems = await page.evaluate((selector) => {
  return Array.from(document.querySelectorAll(selector)).map((row: any) => {
    const titleEl = row.querySelector("td:nth-of-type(2) > div:first-of-type > a");
    const tagsEl = row.querySelector("td:nth-of-type(2) > div:last-of-type");
    const ratingEl = row.querySelector("span.ProblemRating");
    if (!titleEl) return; // skip non-problem rows

    // Convert tags string to array
    const tags = tagsEl?.textContent
      .trim()
      .split(",")
      .map((tag:string) => tag.trim()) 
      .filter(Boolean) || [];
    const rating = ratingEl ? parseInt(ratingEl.textContent.trim()) : "n/a";
    return {
      name: titleEl?.textContent.trim() || "",
      url: "https://codeforces.com" + titleEl?.getAttribute("href"),
      platform: "Codeforces",
      tags,
      difficulty:rating
    };
  });
}, problemSelector) as TopicProblem[]

    if (newProblems.length === 0) break; 

    const remaining=limit-codeforcesProblem.length
    codeforcesProblem.push(...newProblems.slice(0,remaining));

    pageNumber++

  } 
    await browser.close();

  codeforcesProblem.
  filter((p:TopicProblem)=>p!==null && p!==undefined)
  .forEach((value)=>updateCache(value.name,[value]))


}
// scrapeCodeForces()

export async function scrapeLeetcodeTopicProblems(topicName:string){
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/114.0.5735.199 Safari/537.36"
  );

  const url=`https://leetcode.com/problem-list/${topicName}/`

  await page.goto(url,{waitUntil:"domcontentloaded",timeout:30000})
  const problemSelector ="a.group.flex.flex-col.rounded-\\[8px\\].duration-300";

  let prevCount = 0;
  let problems: Problem[] = [];
  while(true){
    await page.evaluate((selector)=>{
      const nodes=document.querySelectorAll(selector)
      if(nodes.length) nodes[nodes.length-1].scrollIntoView({behavior:"smooth"})
    },problemSelector)

  try {
    await page.waitForFunction(
      (sel, prev) => document.querySelectorAll(sel).length > prev,
      { timeout: 15000 }, 
      problemSelector,
      prevCount
    );

  } catch (e) {
    break  
}    
      const newProblems = await page.evaluate(
          (selector, topic) => {
            return Array.from(document.querySelectorAll(selector)).map((element: any) => {
              const titleEl = element.querySelector(".ellipsis.line-clamp-1");
              const difficultyEl = element.querySelector("p.mx-0.text-\\[14px\\]");
              return {
                name: titleEl?.textContent?.trim() || "",
                url: element instanceof HTMLAnchorElement ? element.href : "",
                platform: "LeetCode",
                tags: [topic],
                difficulty: difficultyEl?.textContent?.trim() || null, // add difficulty
              };
            });
          },
          problemSelector,
          topicName
      ) as TopicProblem[];

    // Stop if no new problems loaded
    prevCount = await page.evaluate(sel => document.querySelectorAll(sel).length, problemSelector);
    problems = [...problems, ...newProblems];
    }
  
    await browser.close()


  const dir=path.join(process.cwd(),"corpus")
    if(!fs.existsSync(CORPUS_DIR)) fs.mkdirSync(process.cwd(),"corpus")
  const filePath = path.join(dir, `leetcode-${topicName}.json`);

  fs.writeFileSync(filePath, JSON.stringify(problems, null, 2));
  console.log(`Scraped ${problems.length} problems for topic: ${topicName} and saved to ${filePath}`);

}
// scrapeLeetcodeTopicProblems("iterator")



export async function leetCodeTopicManager(topic:string):Promise<TopicProblem[]>{
  const cacheFile = path.join(CORPUS_DIR, `leetcode-${topic}.json`);

  if (fs.existsSync(cacheFile)) {
    try {
      const data = fs.readFileSync(cacheFile, "utf-8");
      const problems = JSON.parse(data);
      console.log(`Returning cached problems for topic: ${topic}`);
      return problems;
    } catch (err) {
      console.error("Error reading cache, will scrape fresh:", err);
    }
  }

  await scrapeLeetcodeTopicProblems(topic);

  const data = fs.readFileSync(cacheFile, "utf-8");
  const problems:TopicProblem[] = JSON.parse(data);
  return problems;

}





export async function allProblemScrapeManager():Promise<TopicProblem[]> {
    if(fs.existsSync(CACHE_FILE)){
      try {
      const data = fs.readFileSync(CACHE_FILE, "utf-8");
      
      const problems:Record<string,TopicProblem[]> = JSON.parse(data);
      const final_problems=Object.values(problems).flat() 
      // console.log("cf scraper")
      // console.log(final_problems);
      return final_problems;
    } catch (err) {
      console.error("Error reading cache, will scrape fresh:", err);
    }
  }
  await scrapeCodeForces()
  
  const data = fs.readFileSync(CACHE_FILE, "utf-8");
  const problems:Record<string,TopicProblem[]> = JSON.parse(data);
  const final_problems=Object.values(problems).flat()

  console.log("Scraped fresh problems and returning them");

  return final_problems;

}
//tfidf means whenever want to search something it 
//basically treats them like document 
//tfidf meant for info retrieval
//unit of analysis is document
//treats every problem like doc
export async function cfTopicProblemManager(){
  const cfproblem=await allProblemScrapeManager()
  const tfidf=new TfIdf()
  cfproblem.forEach((p,index)=>{
    tfidf.addDocument(p.tags,index)

  })

  cfproblem.forEach((p,index)=>{
    const topTerms:string[]=[]
    tfidf.listTerms(index)
    .slice(0,3)
    .forEach((terms)=>topTerms.push(terms.term))
    p.tags = topTerms.length ? topTerms : ["Misc"]
  })

  const topics:Record<string,TopicProblem[]>={}
    cfproblem.forEach((p)=>{
      for (const element of p.tags!){
        if(!topics[element]) topics[element]=[]
        topics[element].push(p)
      }
    })
  // console.log("In CfTopicManager Function")
  // console.log(topics);
return topics 

}








