"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { fetchUser } from "@/actions/cargo";
import { useGlobalContext } from "@/context";

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { axiosInstance, setUser, user } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return;
    }
    const response = await fetchUser(axiosInstance, email);
    if (response) {
      setError("");
      setUser(response);
      router.push("/dashboard");
    }
    return;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-primaryBg">
      <Card className="bg-secondaryBg p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-primaryText mb-6 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-secondaryText mb-2">
              Correo Electrónico
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-borderColor rounded bg-secondaryBg text-primaryText focus:outline-none focus:border-primaryAccent"
            />
            {error && (
              <p className="text-secondaryButton text-sm mt-2">{error}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-primaryButton hover:bg-secondaryButton text-primaryText py-2 rounded"
          >
            Acceder
          </Button>
        </form>
      </Card>
    </div>
  );
}
