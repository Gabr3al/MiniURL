import URLModel from "@/lib/models/URLModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    await dbConnect();

    const url = await URLModel.findOne({ shortUrl: params.shortUrl, enabled: true});

    if(!url) {
        console.log("URL not found");
        return NextResponse.redirect(process.env.HOSTNAME + "/not-found");
    }

    url.clicks += 1;
    url.save();

    return NextResponse.redirect(url.fullUrl);
}
export const runtime = 'nodejs'