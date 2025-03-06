// src/app/api/charts/cars-by-model/route.js
import { query } from "@/lib/db"; // ตรวจสอบให้แน่ใจว่าเส้นทางนี้ถูกต้อง

export async function GET() {
  const chart = await query({
    query: "SELECT model, production_units FROM cars",
    values: [],
  });

  return new Response(JSON.stringify(chart), {
    status: 200,
    headers: {
      "Content-Type": "application/json", // เพิ่ม Content-Type
    },
  });
}