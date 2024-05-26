import { Inter } from "next/font/google";
import "./globals.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Procesos Candidatos",
  description: "Modulo BD182",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <PrimeReactProvider>
        <body className={inter.className}>{children}</body>
      </PrimeReactProvider>
    </html>
  );
}
