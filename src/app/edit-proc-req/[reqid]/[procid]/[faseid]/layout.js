"use client";
import { useEffect, useState } from "react";
import { UserIcon, LogOutIcon, HomeIcon } from "lucide-react";
import { useGlobalContext } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [name, setName] = useState("Nombre");
  const [role, setRole] = useState("Rol");
  const [date, setDate] = useState("DD/MM/YYYY");
  const router = useRouter();

  const { user, setUser } = useGlobalContext();
  useEffect(() => {
    if (user) {
      setName(`${user.NOMEMPLEADO} ${user.APELLEMPLEADO}`);
      setRole(user.DESCCARGO);
      setDate(
        new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-primaryBg text-primaryText">
      <aside className="w-64 bg-secondaryBg p-4 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <p className="text-secondaryText">{date}</p>
          </div>
          <div className="flex items-center mb-4">
            <UserIcon className="text-primaryAccent w-16 h-16 mr-4" />
            <div>
              <p className="font-bold text-xl">{name}</p>
              <p className="text-secondaryText">{role}</p>
            </div>
          </div>
          <nav>
            <Link
              href="/dashboard"
              className="flex items-center mb-2 p-2 rounded hover:bg-primaryAccent hover:text-primaryBg transition-colors"
            >
              <button className="flex items-center rounded hover:bg-primaryAccent hover:text-primaryBg transition-colors">
                <HomeIcon className="w-6 h-6 mr-2" />
                Dashboard
              </button>
            </Link>
            <Link
              href="/"
              className="flex items-center p-2 rounded hover:bg-primaryAccent hover:text-primaryBg transition-colors"
            >
              <button
                onClick={(e) => {
                  setUser(null);
                }}
                className="flex items-center rounded hover:bg-primaryAccent hover:text-primaryBg transition-colors"
              >
                <LogOutIcon className="w-6 h-6 mr-2" />
                Logout
              </button>
            </Link>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-4">
        <div className="bg-secondaryBg p-6 rounded-lg h-full">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
