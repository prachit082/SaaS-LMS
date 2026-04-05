import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      {
        ok: false,
        message: "Supabase environment variables are missing",
      },
      { status: 500 },
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from("companions")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message: "Supabase keep-alive query failed",
          error: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Supabase is active",
      rowsChecked: data?.length ?? 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Unexpected error while pinging Supabase",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
