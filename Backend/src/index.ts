import express, {  Request, Response } from "express";
import cors from "cors"
import {z} from "zod"
import { searchByPlatform, searchProblemsByName } from "./problemUtils";
import { cfTopicProblemManager, leetCodeTopicManager } from "./scraper";
const app=express()
const port = 3000
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())


const problemNameSchema = z
  .string()
  .max(100, "Problem name must be at most 100 characters")
  .regex(/^[a-zA-Z0-9 ]+$/, "No special characters allowed")
  .transform((str) => str.trim().toLowerCase());




app.get('/api/v1/problems',async(req:Request,res:Response)=>{
try {

  const problemNameResult=problemNameSchema.safeParse(req.query.problemName)
  if(!problemNameResult.success){
    const err=problemNameResult.error.issues.map(e=>e.message)
    res.status(400).json({error:err})
    return
  }
  const problemName=problemNameResult.data
  const problems=await searchProblemsByName(problemName)
  if(problems.length <=0){
    res.status(404)
    .json({
      success:false,
      message:"Could Not find your problem!"
    })
    return
  }
  res.status(200).json({
    success:true,
    problems
  })
  return
} catch (error) {
    res.status(500).json({error:(error instanceof Error)?error.message : String(error)})
      return

}

})


app.get('/api/v1/topic/:platform',async(req:Request,res:Response)=>{
  try { 
     const paramsSchema = z.object({
      platform: z.enum(["LeetCode", "Codeforces"])
    });
    const platformResult = paramsSchema.safeParse(req.params);
    if(!platformResult.success){
        const err = platformResult.error.issues.map(e=>e.message)
      res.status(400).json({ error:err});
      return
    }
    
    const topicNameSchema=z
    .string()
    .min(2,"Topic Must be 2 characters long")
    .max(100,"Topic must have only 100 characters")
      .regex(/^[a-zA-Z0-9 ]+$/, "Only letters, numbers, spaces, and dashes allowed")
    .transform((str) => str.trim().toLowerCase());

    const topicResult=topicNameSchema.safeParse(req.query.topic)
    if(!topicResult.success){
      const err=topicResult.error.issues.map(e=>e.message)
      res.status(400).json({ error:err });
      return
    }
    const {platform}=platformResult.data
    const topic=topicResult.data
    console.log(topic)
    let problems;     
    if(platform==="LeetCode"){
      problems=await leetCodeTopicManager(topic)
    }else if(platform === "Codeforces"){
      const topicRecords=await cfTopicProblemManager()
      problems=topicRecords?.[topic]
    }
    
    if (!problems) {
      problems=[]
      res.status(404).json({
        success: false,
        message: `No problems found for topic "${topic}" on ${platform}`,
      });
      return
    }

    problems=Object.values(problems).flat()
    
    res.status(200).json({
      success: true,
      platform,
      topic,
      problems,
    });
    return

    
  } catch (error) {
    res.status(500).json({error:(error instanceof Error)?error.message : String(error)})
      return
  }
})

app.get('/api/v1/problem/:platform',async(req:Request,res:Response)=>{
  try {
    const paramsSchema = z.object({
      platform: z.enum(["LeetCode", "Codeforces"])
    });
    const { platform } = paramsSchema.parse(req.params);
    const problems=await searchByPlatform(platform)

    if(problems.length === 0){
      res.status(404).json({message:"Resource Not found"})
      return
    }
    res.status(200).json({success:true,problems})
    return


  } catch (error) {
    console.log(error)
    res.status(500).json({error:(error instanceof Error)?error.message :String(error)})
  }

})

app.listen(port,()=>console.log(`Listening on ${port} `))
