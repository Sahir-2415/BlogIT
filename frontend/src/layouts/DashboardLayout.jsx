import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      <DashboardSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}