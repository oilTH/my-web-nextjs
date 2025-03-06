// src/components/Chart1.jsx
"use client"; // เพิ่มบรรทัดนี้เพื่อให้คอมโพเนนต์ทำงานในฝั่งไคลเอนต์

import React, { useEffect, useState } from 'react'; // นำเข้า React, useEffect และ useState
import { Line } from 'react-chartjs-2'; // นำเข้า Line จาก react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; // นำเข้าส่วนประกอบที่จำเป็นจาก chart.js

// ลงทะเบียน scale และส่วนประกอบที่จำเป็น
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// สร้างฟังก์ชันคอมโพเนนต์ Chart1
export default function Chart1() {
  const [data, setData] = useState({ labels: [], datasets: [] }); // สร้าง state สำหรับข้อมูลกราฟ

  useEffect(() => {
    async function fetchData() { // ฟังก์ชันสำหรับดึงข้อมูล
      try {
        const res = await fetch('/api/charts/cars-by-model'); // ใช้เส้นทางสัมพัทธ์เพื่อดึงข้อมูลจาก API
        if (!res.ok) {
          throw new Error('Network response was not ok'); // ถ้าการตอบสนองไม่ถูกต้อง ให้โยนข้อผิดพลาด
        }
        const jsonData = await res.json(); // แปลงข้อมูลที่ได้รับเป็น JSON
        setData({
          labels: jsonData.map(item => item.model), // ตั้งค่า labels จากข้อมูลที่ได้รับ
          datasets: [{
            label: 'Production Units', // ชื่อของชุดข้อมูล
            data: jsonData.map(item => item.production_units), // ตั้งค่าข้อมูลการผลิตจากข้อมูลที่ได้รับ
            borderColor: 'rgb(255, 99, 132)', // สีของเส้นกราฟ
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // สีพื้นหลังของกราฟ
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error); // แสดงข้อผิดพลาดใน Console
      }
    }
    fetchData(); // เรียกใช้ฟังก์ชัน fetchData
  }, []); // ใช้ useEffect เพื่อดึงข้อมูลเมื่อคอมโพเนนต์ถูกสร้าง

  return <Line data={data} />; // แสดงกราฟโดยใช้ข้อมูลที่ตั้งค่า
}