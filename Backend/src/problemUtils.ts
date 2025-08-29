import path from "path"
import fs from "fs"
import { allProblemScrapeManager  } from "./scraper"
const CACHE_DIR=path.join(process.cwd(),"corpus")
const CACHE_FILE=path.join(CACHE_DIR,"all_problems.json")


export async function searchProblemsByName(problemName:string){
    const all_problems=await allProblemScrapeManager()
    console.log(all_problems);
    const filtered_problem=all_problems.filter(p=>
  p.name.toLowerCase().includes(problemName.toLowerCase())
    )
    console.log("in search function ",filtered_problem)
    return filtered_problem
}

export async function searchByPlatform(platform:string){
    const all_problems=await allProblemScrapeManager()
    const ans=all_problems.filter(p=>p.platform===platform)
    return ans
}

