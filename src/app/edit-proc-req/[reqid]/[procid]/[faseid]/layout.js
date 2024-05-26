"use client";
import { useState } from "react";
import { UserIcon, LogOutIcon, HomeIcon } from "lucide-react";

const Layout = ({ children }) => {
  const [name, setName] = useState("Nombre");
  const [role, setRole] = useState("Rol");
  const [date, setDate] = useState("DD/MM/YYYY");

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
            <a
              href="/dashboard"
              className="flex items-center mb-2 p-2 rounded hover:bg-primaryAccent hover:text-primaryBg transition-colors"
            >
              <HomeIcon className="w-6 h-6 mr-2" />
              Dashboard
            </a>
            <a
              href="/"
              className="flex items-center p-2 rounded hover:bg-primaryAccent hover:text-primaryBg transition-colors"
            >
              <LogOutIcon className="w-6 h-6 mr-2" />
              Logout
            </a>
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
