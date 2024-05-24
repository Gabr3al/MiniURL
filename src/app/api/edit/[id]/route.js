import dbConnect from "@/lib/dbConnect";
import URLModel from "@/lib/models/URLModel";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function PUT(req, { params }) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" },
            { status: 401 }
        );
    }

    if(!params.id) {
        return NextResponse.json({ message: "Invalid ID" },
            { status: 400 }
        );
    }

    const { name, fullUrl, enabled } = await req.json();

    if(!name || !fullUrl) {
        return NextResponse.json({ message: "Missing Fields" },
            { status: 400 }
        );
    }

    await dbConnect();

    const url = await URLModel.findOne({ _id: params.id, userId });

    if(!url) {
        return NextResponse.json({ message: "URL not found" },
            { status: 404 }
        );
    }

    url.name = name;
    url.fullUrl = fullUrl;
    url.enabled = enabled;

    await url.save();
    

    return NextResponse.json({message: "Updated Successfully"}, {
        status: 200,
    });
}

export const dynamic = 'force-dynamic'
export const runtime = 'edge';