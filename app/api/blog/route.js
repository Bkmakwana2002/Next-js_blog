import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main(){
   try {
    await prisma.$connect()
   } catch (error) {
      return Error(error)
   }
}

export const GET = async(req,res)=>{
  try {
    await main();
    const post = await prisma.post.findMany()
    return NextResponse.json({ message:"success",post },{status:200})
  } catch (error) {
    return NextResponse.json({ message: "GET Error",error },{status:500})
  }finally{
    await prisma.$disconnect()
  }
}

export const POST = async(req,res)=>{
  try {
    const { title,description } = await req.json()
    await main()

    const post = await prisma.post.create({data:{ description,title }})
    return NextResponse.json({ message:"success",post },{status:201})
  } catch (error) {
    return NextResponse.json({ message: "GET Error",error },{status:500})
  }finally{
    await prisma.$disconnect()
  }
}

