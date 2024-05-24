import dbConnect from "@/lib/dbConnect";
import URLModel from "@/lib/models/URLModel";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" },
            { status: 401 }
        );
    }

    await dbConnect();

    const urls = await URLModel.find({ userId }).select("name shortUrl fullUrl clicks enabled");

    return NextResponse.json(urls, {
        status: 200,
    });
}

export const dynamic = 'force-dynamic'
export const runtime = 'edge';