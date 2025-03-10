import { query } from "@/lib/db";

// GET: ดึงข้อมูลรถตาม ID
export async function GET(request, { params }) {
  const id = params.id;
  try {
    const car = await query({
      query: "SELECT * FROM cars WHERE id = ?", // เปลี่ยนเป็น cars
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
      status: 201, // ใช้ 201 สำหรับการสร้างใหม่
      car: car
    }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error adding new car:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// PUT: อัปเดตข้อมูลรถ
export async function PUT(request, { params }) {
  const id = params.id;
  const { model, year, engine_type, horsepower, torque, top_speed_kmh, acceleration_0_100, production_units, weight_kg, drivetrain, fuel_type, special_features } = await request.json();
  try {
    const updateCar = await query({
      query: "UPDATE cars SET model = ?, year = ?, engine_type = ?, horsepower = ?, torque = ?, top_speed_kmh = ?, acceleration_0_100 = ?, production_units = ?, weight_kg = ?, drivetrain = ?, fuel_type = ?, special_features = ? WHERE id = ?", // เปลี่ยนเป็น cars
      values: [model, year, engine_type, horsepower, torque, top_speed_kmh, acceleration_0_100, production_units, weight_kg, drivetrain, fuel_type, special_features, id],
    });

    const result = updateCar.affectedRows;
    let message = result ? "success" : "error";
    const updatedCar = { id, model, year, engine_type, horsepower, torque, top_speed_kmh, acceleration_0_100, production_units, weight_kg, drivetrain, fuel_type, special_features };

    return new Response(JSON.stringify({
      message: message,
      status: 200,
      car: updatedCar
    }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error updating car:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

// DELETE: ลบข้อมูลรถตาม ID
export async function DELETE(request, { params }) {
  const id = params.id;
  try {
    const deleteCar = await query({
      query: "DELETE FROM cars WHERE id = ?", // เปลี่ยนเป็น cars
      values: [id],
    });
    const result = deleteCar.affectedRows;
    let message = result ? "success" : "error";
    const car = { id };
    return new Response(JSON.stringify({
      message: message,
      status: 200,
      car: car
    }));
  } catch (error) {
    console.error("Error deleting car:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}