import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (req:NextApiRequest) => {
    try {
      console.log("RR")
        const { email, name, password } = await req.json();

        const existingUser = await prismadb.user.findUnique({
            where: {
              email
            }
          })
      
          if (existingUser) {
            return new NextResponse(JSON.stringify({error:"email taken"}),{status:200})
          }

          const hashedPassword = await bcrypt.hash(password, 12);

          const user = await prismadb.user.create({
            data: {
              email,
              name,
              hashedPassword,
              image: '',
              emailVerified: new Date(),
            }
          })

          return new NextResponse(JSON.stringify(user),{status:200})

    } catch (error) {
        return new NextResponse(JSON.stringify({error:`Something went wrong: ${error}`}),{status:400})
      }
}