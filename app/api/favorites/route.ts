import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const { currentUser } = await serverAuth(req, res);

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        }
      }
    });

    return new NextResponse(JSON.stringify(favoritedMovies),{status:200})
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({error: `something worng ${error}`}),{status:500})
  }
}
