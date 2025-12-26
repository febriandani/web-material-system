"use client";

import { useRouter } from "next/navigation";
import { LogOut, User, Ticket } from "lucide-react";
import { clearAuth, getRefreshToken } from "@/lib/auth";
import api from "@/lib/api";

interface UserData {
  id: number;
  username: string;
  fullName: string;
  role: string;
  departmentId: number;
  email: string;
  phone: string;
}

interface ProfileDropdownProps {
  user: UserData;
  onLogout: () => void;
}

type TicketStatus = "Approved" | "Pending" | "On Hold";

const statusBadgeStyle = (status: TicketStatus) => {
  switch (status) {
    case "Approved":
      return "bg-green-500/20 text-green-400";
    case "Pending":
      return "bg-yellow-500/20 text-yellow-400";
    case "On Hold":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export default function ProfileDropdown({
  user,
  onLogout,
}: ProfileDropdownProps) {
  return (
    <div className="w-80 bg-[#020617] rounded-2xl shadow-xl overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-lg font-semibold">
          {user.fullName?.[0] || user.username[0]}
        </div>
        <div>
          <p className="font-semibold">{user.fullName}</p>
          <p className="text-sm text-gray-400">{user.email || "-"}</p>
          <span className="text-xs text-blue-400">{user.role}</span>
        </div>
      </div>

      {/* MY TICKETS (DUMMY) */}
      <div className="p-4 border-b border-gray-800">
        <p className="text-sm text-gray-400 mb-2">My Tickets (3)</p>

        {[
          { id: "MR-2024-1245", status: "Approved" as TicketStatus },
          { id: "MR-2024-1244", status: "Pending" as TicketStatus },
          { id: "MR-2024-1243", status: "On Hold" as TicketStatus },
        ].map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center bg-[#0F172A] rounded-lg p-3 mb-2"
          >
            <span className="text-blue-400 text-sm">{t.id}</span>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${statusBadgeStyle(
                t.status
              )}`}
            >
              {t.status}
            </span>
          </div>
        ))}
      </div>

      {/* ACTION */}
      <div className="p-2">
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 rounded-lg">
          Profile Settings
        </button>

        <button
          onClick={onLogout}
          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
