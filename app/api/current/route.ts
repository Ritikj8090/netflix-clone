import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";


export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { currentUser } = await serverAuth(req, res);

    return new NextResponse(JSON.stringify(currentUser),{status:200})
  } catch (error) {
    return new NextResponse(JSON.stringify({error: `something worong${error}`}),{status:200})
  }
}