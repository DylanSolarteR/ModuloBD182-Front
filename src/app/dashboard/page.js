"use client";
import DashboardCliente from "@/components/DashboardCliente";
import DashboardGeneral from "@/components/DashboardGeneral";
import DashboardDefault from "@/components/DashboardDefault";
import { useGlobalContext } from "@/context";
const DashboardPage = () => {
  const { user } = useGlobalContext();
  if (user) {
    if (user.DESCCARGO === "Analista Cliente") {
      return <DashboardCliente />;
    }
    if (user.DESCCARGO === "Analista General") {
      return <DashboardGeneral />;
    }
  }
  return (
    <div>
      <DashboardDefault />
    </div>
  );
};

export default DashboardPage;
