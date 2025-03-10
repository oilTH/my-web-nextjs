import { query } from "@/lib/db";

// GET: ดึงข้อมูลรถตาม ID
export async function GET(request, { params }) {
  // ตรวจสอบว่า params และ id มีอยู่
  if (params && params.id) {
    const id = params.id;
    try {
      const car = await query({
        query: "SELECT * FROM cars WHERE id = ?",
        values: [id],
      });

      if (car.length === 0) {
        return new Response(JSON.stringify({ message: "Car not found" }), {
          status: 404,
        });
      }

      let data = JSON.stringify(car);
      return new Response(data, {
        status: 200,
      });
    } catch (error) {
      console.error("Error fetching car:", error);
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  } else {
    // ถ้าไม่มี ID ให้ดึงข้อมูลทั้งหมด
    return await GET_ALL();
  }
}

// GET: ดึงข้อมูลทั้งหมดจากตาราง cars
export async function GET_ALL() {
  try {
    const cars = await query({
      query: "SELECT * FROM cars",
      values: [],
    });

    let data = JSON.stringify(cars);
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching all cars:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// POST: เพิ่มข้อมูลรถใหม่
export async function POST(request) {
  try {
    const { model, year, engine_type, horsepower, torque, top_speed_kmh, acceleration_0_100, production_units, weight_kg, drivetrain, fuel_type, special_features } = await request.json();
    const newCar = await query({
      query: "INSERT INTO cars (model, year, engine_type, horsepower, torque, top_speed_kmh, acceleration_0_100, production_units, weight_kg, drivetrain, fuel_type, special_features) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [model, year, engine_type, horsepower, torque, top_speed_kmh, acceleration_0_100, production_units, weight_kg, drivetrain, fuel_type, special_features],
    });
    const result = newCar.affectedRows;
    let message = result ? "success" : "error";
    const car = { model, year, engine_type, horsepower, torque, top_speed_kmh, acceleration_0_100, production_units, weight_kg, drivetrain, fuel_type, special_features };
    return new Response(JSON.stringify({
      message: message,
      status: 200,
      car: car
    }));
  } catch (error) {
    console.error("Error adding new car:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}