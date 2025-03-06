import Chart1 from "@/components/Chart1"; // นำเข้าคอมโพเนนต์ Chart1

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gray-100">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center space-y-8 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">กราฟข้อมูลรถยนต์ในปี 2022-2024</h1>
        <p className="text-center text-gray-600 mb-4">สำรวจข้อมูลรถยนต์ที่น่าสนใจและจัดอันดับ</p>
        
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center text-gray-800">จำนวนรถตามรุ่น</h2>
          <Chart1 />
        </div>
      </div>
    </main>
  );
}
