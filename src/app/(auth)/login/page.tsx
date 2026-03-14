"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Supabase Auth integration
        router.push("/dashboard");
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
                    FamilyFlow
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                    Tu copiloto financiero familiar
                </p>
            </div>

            {/* Login Card */}
            <div
                style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-xl)",
                    padding: "var(--space-8)",
                    boxShadow: "var(--shadow-md)",
                }}
            >
                <h2
                    className="mb-6"
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: 20,
                        textAlign: "center",
                    }}
                >
                    Iniciar Sesión
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email */}
                    <div>
                        <label
                            className="block mb-1.5"
                            style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: "var(--text-secondary)",
                            }}
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
                                transition: "border-color 0.2s",
                            }}
                        >
                            <Mail size={18} style={{ color: "var(--text-secondary)" }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                                className="flex-1 bg-transparent outline-none"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 14,
                                    color: "var(--text)",
                                }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            className="block mb-1.5"
                            style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: "var(--text-secondary)",
                            }}
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
                                transition: "border-color 0.2s",
                            }}
                        >
                            <Lock size={18} style={{ color: "var(--text-secondary)" }} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="flex-1 bg-transparent outline-none"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 14,
                                    color: "var(--text)",
                                }}
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

                    {/* Forgot password */}
                    <div className="text-right">
                        <Link
                            href="/recuperar"
                            className="text-sm hover:underline"
                            style={{ color: "var(--color-primary-light)", fontWeight: 500 }}
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Submit */}
                    <Button type="submit" fullWidth>
                        <LogIn size={18} />
                        Ingresar
                    </Button>
                </form>

                {/* Divider */}
                <div
                    className="flex items-center gap-3 my-6"
                    style={{ color: "var(--text-secondary)", fontSize: 12 }}
                >
                    <span
                        className="flex-1"
                        style={{ height: 1, background: "var(--border-color)" }}
                    />
                    o
                    <span
                        className="flex-1"
                        style={{ height: 1, background: "var(--border-color)" }}
                    />
                </div>

                {/* Google sign-in placeholder */}
                <Button variant="secondary" fullWidth>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Continuar con Google
                </Button>

                {/* Sign up link */}
                <p
                    className="text-center mt-6"
                    style={{ fontSize: 14, color: "var(--text-secondary)" }}
                >
                    ¿No tienes cuenta?{" "}
                    <Link
                        href="/registro"
                        className="hover:underline"
                        style={{
                            color: "var(--color-primary)",
                            fontWeight: 600,
                        }}
                    >
                        Regístrate gratis
                    </Link>
                </p>
            </div>
        </div>
    );
}
