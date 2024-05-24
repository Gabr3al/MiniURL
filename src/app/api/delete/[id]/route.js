import dbConnect from "@/lib/dbConnect";
import URLModel from "@/lib/models/URLModel";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req, { params }) {
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

    await dbConnect();

    const url = await URLModel.findOne({ _id: params.id, userId });

    if(!url) {
        return NextResponse.json({ message: "URL not found" },
            { status: 404 }
        );
    }

    await URLModel.deleteOne({ _id: params.id });

    return NextResponse.json({message: "Deleted Successfully"}, {
        status: 200,
    });
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'