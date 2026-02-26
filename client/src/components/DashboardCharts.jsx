import { useEffect } from "react";
import ApexCharts from "apexcharts";

function DashboardCharts({ metrics }) {
  const presentToday = metrics?.present_today ?? 0;
  const absentToday = metrics?.absent_today ?? 0;
  const departmentCounts = metrics?.department_count ?? {};

  useEffect(() => {
    const pieEl = document.getElementById("pie-chart");
    const attendanceEl = document.getElementById("attendance-chart");

    // destroy old charts if they exist
    if (pieEl?.__chart__) pieEl.__chart__.destroy();
    if (attendanceEl?.__chart__) attendanceEl.__chart__.destroy();

    const brandColor = "#2563eb"
    const brandSecondaryColor = "#3b82f6"; 
    const brandTertiaryColor = "#60a5fa";  
    const neutralPrimaryColor = "#93c5fd";  

    // Pie chart
    const pieOptions = {
      series: departmentCounts.map((d) => d.count),
      labels: departmentCounts.map((d) => d.department),
      colors: [brandColor, brandSecondaryColor, brandTertiaryColor, neutralPrimaryColor],
      chart: { type: "pie", height: 300 },
      stroke: { colors: [neutralPrimaryColor] },
      plotOptions: {
        pie: {
          dataLabels: { offset: -20 },
          expandOnClick: true,
        },
      },
      dataLabels: { enabled: true, style: { fontFamily: "Inter, sans-serif" } },
      legend: { position: "bottom", fontFamily: "Inter, sans-serif" },
    };
    if (pieEl) {
      const chart = new ApexCharts(pieEl, pieOptions);
      chart.render();
      pieEl.__chart__ = chart; // attach to DOM for cleanup
    }

    // Donut chart
    const donutOptions = {
      series: [presentToday, absentToday],
      labels: ["Present", "Absent"],
      colors: [brandColor, brandTertiaryColor],
      chart: { type: "donut", height: 300 },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Today",
                formatter: () => presentToday + absentToday,
              },
            },
          },
        },
      },
      dataLabels: { enabled: false },
      legend: { position: "bottom", fontFamily: "Inter, sans-serif" },
    };
    if (attendanceEl) {
      const chart = new ApexCharts(attendanceEl, donutOptions);
      chart.render();
      attendanceEl.__chart__ = chart; // attach to DOM for cleanup
    }
  }, [presentToday, absentToday, departmentCounts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card flex-col">
        <h3 className="text-md font-semibold mb-2 text-heading">Today's Attendance</h3>
        <div id="attendance-chart" className="w-full h-[300px]"></div>
      </div>

      <div className="card flex-col">
        <h3 className="text-md font-semibold mb-2 text-heading">Employees by Department</h3>
        <div id="pie-chart" className="w-full h-[300px]"></div>
      </div>
    </div>
  );
}

export default DashboardCharts;