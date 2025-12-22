import { Bell, FileText, Grid, Package, Plus, Search, User } from "lucide-react";
import React from "react";

/* ================= TYPES ================= */

type MRStatus = "Done" | "Open" | "In Progress" | "Hold";

interface MRData {
  mr: string;
  part: string;
  pic: string;
  dept: string;
  date: string;
  total: number;
  issued: number;
  status: MRStatus;
  approval: string;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

/* ================= PAGE ================= */

export default function MaterialRequestPage() {
  const data: MRData[] = [
    {
      mr: "MR-2024-1245",
      part: "Bearing SKF 6205",
      pic: "Agus Setiawan",
      dept: "Production",
      date: "2024-12-14",
      total: 50,
      issued: 50,
      status: "Done",
      approval: "Approved - Ir. Budi Santoso",
    },
    {
      mr: "MR-2024-1244",
      part: "Hydraulic Oil AW-68",
      pic: "Dian Pratiwi",
      dept: "Maintenance",
      date: "2024-12-13",
      total: 200,
      issued: 0,
      status: "Open",
      approval: "Pending",
    },
  ];

  const statusColor = (status: MRStatus): string => {
    switch (status) {
      case "Done":
        return "bg-green-500/20 text-green-400";
      case "Open":
        return "bg-yellow-500/20 text-yellow-400";
      case "In Progress":
        return "bg-purple-500/20 text-purple-400";
      case "Hold":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0B1220] text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-[#070D1A] p-6 space-y-6">
        <div>
          <h1 className="text-blue-500 font-semibold">Material Request</h1>
          <p className="text-xs text-gray-400">Administrator</p>
        </div>
        <nav className="space-y-2">
          <MenuItem icon={<Grid size={18} />} label="Dashboard" />
          <MenuItem icon={<FileText size={18} />} label="Work List MR" active />
          <MenuItem icon={<Plus size={18} />} label="Form Request" />
          <MenuItem icon={<Package size={18} />} label="Availability Part" />
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Work List Material Request</h2>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-400" />
            <div className="flex items-center gap-2">
              <User className="bg-blue-600 rounded-full p-1" />
              <div className="text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-[#0F172A] rounded-xl p-4 mb-6 flex flex-wrap gap-3">
          <div className="flex items-center bg-[#020617] rounded-lg px-3 py-2 w-64">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Cari MR Number, Part Name, PIC..."
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>
          <select className="bg-[#020617] rounded-lg px-3 py-2 text-sm">
            <option>Semua Status</option>
          </select>
          <input type="date" className="bg-[#020617] rounded-lg px-3 py-2 text-sm" />
          <input type="date" className="bg-[#020617] rounded-lg px-3 py-2 text-sm" />
        </div>

        {/* Table */}
        <div className="bg-[#0F172A] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#020617] text-gray-400">
              <tr>
                <th className="p-3 text-left">Action</th>
                <th className="p-3">MR Number</th>
                <th className="p-3">Part Name</th>
                <th className="p-3">PIC Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total Qty</th>
                <th className="p-3">Qty Issued</th>
                <th className="p-3">Status</th>
                <th className="p-3">Approval</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.mr} className="border-b border-gray-800">
                  <td className="p-3">
                    <button className="bg-blue-600 text-xs px-3 py-1 rounded-lg">
                      View
                    </button>
                  </td>
                  <td className="p-3 text-blue-400">{row.mr}</td>
                  <td className="p-3">{row.part}</td>
                  <td className="p-3">{row.pic}</td>
                  <td className="p-3">{row.dept}</td>
                  <td className="p-3">{row.date}</td>
                  <td className="p-3 text-center">{row.total}</td>
                  <td className="p-3 text-center">{row.issued}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusColor(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400">{row.approval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

/* ================= COMPONENT ================= */

function MenuItem({ icon, label, active = false }: MenuItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm ${
        active
          ? "bg-blue-600/20 text-blue-400"
          : "text-gray-400 hover:bg-white/5"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
