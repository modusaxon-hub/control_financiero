"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";

export default function RegistroPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Supabase Auth integration
        router.push("/onboarding/modo");
    };

    return (
        <div className="w-full" style={{ maxWidth: 420 }}>
            {/* Logo + Brand */}
            <div className="text-center mb-8">
                <div
                    className="mx-auto mb-4 flex items-center justify-center rounded-2xl"
                    style={{
                        width: 72,
                        height: 72,
                        background: "var(--color-primary)",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: 12,
                        border: "2px dashed rgba(255,255,255,0.3)",
                    }}
                >
                    LOGO
                </div>
                <h1
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: 28,
                        color: "var(--color-primary)",
                        marginBottom: 4,
                    }}
                >
                    Crea tu cuenta
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                    Empieza a organizar tus finanzas hoy
                </p>
            </div>

            {/* Register Card */}
            <div
                style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-xl)",
                    padding: "var(--space-8)",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div>
                        <label
                            className="block mb-1.5"
                            style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}
                        >
                            Nombre completo
                        </label>
                        <div
                            className="flex items-center gap-3 px-3"
                            style={{
                                background: "var(--surface-elevated)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "var(--radius-md)",
                                height: 48,
                            }}
                        >
                            <User size={18} style={{ color: "var(--text-secondary)" }} />
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                required
                                className="flex-1 bg-transparent outline-none"
                                style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text)" }}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            className="block mb-1.5"
                            style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}
                        >
                            Correo electrónico
                        </label>
                        <div
                            className="flex items-center gap-3 px-3"
                            style={{
                                background: "var(--surface-elevated)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "var(--radius-md)",
                                height: 48,
                            }}
                        >
                            <Mail size={18} style={{ color: "var(--text-secondary)" }} />
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                required
                                className="flex-1 bg-transparent outline-none"
                                style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text)" }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            className="block mb-1.5"
                            style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}
                        >
                            Contraseña
                        </label>
                        <div
                            className="flex items-center gap-3 px-3"
                            style={{
                                background: "var(--surface-elevated)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "var(--radius-md)",
                                height: 48,
                            }}
                        >
                            <Lock size={18} style={{ color: "var(--text-secondary)" }} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mínimo 8 caracteres"
                                required
                                minLength={8}
                                className="flex-1 bg-transparent outline-none"
                                style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text)" }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-1"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" fullWidth className="mt-2">
                        <UserPlus size={18} />
                        Crear cuenta
                    </Button>
                </form>

                <p
                    className="text-center mt-6"
                    style={{ fontSize: 14, color: "var(--text-secondary)" }}
                >
                    ¿Ya tienes cuenta?{" "}
                    <Link
                        href="/login"
                        className="hover:underline"
                        style={{ color: "var(--color-primary)", fontWeight: 600 }}
                    >
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
