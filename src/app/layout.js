import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalWrapper } from "@/context";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Procesos Candidatos",
  description: "Modulo BD182",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <GlobalWrapper>{children}</GlobalWrapper>
      </body>
    </html>
  );
}
