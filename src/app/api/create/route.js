import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"

import dbConnect from "@/lib/dbConnect";
import URLModel from "@/lib/models/URLModel"; 

export async function POST(req) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        let { fullUrl, name } = await req.json();

        if(!fullUrl || !name) {
            return NextResponse.json({ message: "Missing Fields" },
                { status: 400 }
            );
        }

        if(fullUrl.length > 1024) {
            return NextResponse.json({ message: "URL too long" },
                { status: 400 }
            );
        }

        if(name.length > 50) {
            return NextResponse.json({ message: "Name too long" },
                { status: 400 }
            );
        }

        const urlRegex = new RegExp(/^(http|https):\/\/[^ "]+$/);
        if(!urlRegex.test(fullUrl)) {
            return NextResponse.json({ message: "Invalid URL" },
                { status: 400 }
            );
        }

        const shortUrl = generateRandomString(5);

        await dbConnect();

        const urls = await URLModel.find({ userId });
        if(urls.length >= 10) {
            return NextResponse.json({ message: "Max URLs reached" },
                { status: 400 }
            );
        }

        const newURL = new URLModel({
            userId,
            name,
            fullUrl,
            shortUrl,
        });

        await newURL.save();

        //get the newly created URL with _id and return it
        const url = await URLModel.findOne({ _id: newURL._id }).select("name shortUrl fullUrl clicks enabled");

        return NextResponse.json({ url }, {
            status: 201,
        });

    } catch (error) {
        return NextResponse.json({ message: error.message },
            { status: 500 }
        );
    }
}


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const dynamic = 'force-dynamic'