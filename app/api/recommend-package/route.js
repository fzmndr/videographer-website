// app/api/recommend-package/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validasi sederhana: Pastikan semua field ada
    if (!body.event || !body.budget) {
      return NextResponse.json({ error: "Data tidak lengkap!" }, { status: 400 });
    }

    // Pastikan budget adalah angka setelah titik dihilangkan
    const cleanBudget = Number(body.budget);
    if (isNaN(cleanBudget)) {
        return NextResponse.json({ error: "Format budget salah!" }, { status: 400 });
    }

    // Lanjutkan proses ke AI...
    // const result = await callAI(body);
    
    return NextResponse.json({ result: "Rekomendasi Anda..." });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}