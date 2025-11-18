import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force the route to be dynamic so it actually runs every time
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Initialize a simple client just for this request
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Performing a lightweight query. Even if this returns 0 rows or an error,
    // the connection to the DB counts as "activity".
    const { data, error } = await supabase
      .from('companions')
      .select('id')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ message: 'Supabase is active', data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}