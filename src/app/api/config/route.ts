import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY})
}
