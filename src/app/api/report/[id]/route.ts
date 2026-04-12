import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const supabase = createServerClient()
    const { data: report, error } = await supabase
      .from('reports')
      .select('report_data')
      .eq('id', id)
      .single()

    if (error || !report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    return NextResponse.json(report.report_data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 })
  }
}
