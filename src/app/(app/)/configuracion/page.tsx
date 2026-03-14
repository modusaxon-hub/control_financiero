"use client";

import { useState } from "react";
import { Settings, LogOut, User, Users, Calendar, Bell, Palette } from "lucide-react";
import Button from "@/components/ui/Button";
import { signOut } from "@/lib/auth-actions";

export default function ConfiguracionPage() {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = async () => {
        await signOut();
    };

    const settings = [
        {
            id: "perfil",
            label: "Perfil",
            desc: "Nombre, email y foto de perfil",
            icon: User,
            color: "var(--color-info)",
            onClick: () => alert("⚙️ Perfil: Esta funcionalidad está siendo desarrollada"),
        },
        {
            id: "modo",
            label: "Modo de Cuenta",
            desc: "Individual o Familiar",
            icon: Users,
            color: "var(--color-success)",
            onClick: () => alert("⚙️ Modo: Esta funcionalidad está siendo desarrollada"),
        },
        {
            id: "corte",
            label: "Fecha de Corte",
            desc: "Día de inicio de tu período de presupuesto",
            icon: Calendar,
            color: "var(--color-primary)",
            onClick: () => alert("⚙️ Fecha de Corte: Esta funcionalidad está siendo desarrollada"),
        },
        {
            id: "notif",
            label: "Notificaciones",
            desc: "Configurar nudges y alertas",
            icon: Bell,
            color: "var(--color-info)",
            onClick: () => alert("🔔 Notificaciones: Esta funcionalidad está siendo desarrollada"),
        },
        {
            id: "apariencia",
            label: "Apariencia",
            desc: "Modo claro, oscuro o automático",
            icon: Palette,
            color: "var(--color-warning)",
            onClick: () => alert("🎨 Apariencia: Dark mode está activado por defecto. Próximas opciones en desarrollo"),
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: 24,
                        color: "var(--text)",
                    }}
                >
                    Configuración
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                    Preferencias de tu cuenta y de la app
                </p>
            </div>

            {/* Settings Grid */}
            <div className="flex flex-col gap-3 mb-8">
                {settings.map((setting) => {
                    const Icon = setting.icon;
                    return (
                        <button
                            key={setting.id}
                            onClick={setting.onClick}
                            className="flex items-center justify-between text-left w-full group"
                            style={{
                                background: "var(--surface)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "var(--radius-md)",
                                padding: "var(--space-4)",
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "var(--surface-elevated)";
                                e.currentTarget.style.borderColor = setting.color;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "var(--surface)";
                                e.currentTarget.style.borderColor = "var(--border-color)";
                            }}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={20}
                                        style={{ color: setting.color, opacity: 0.8 }}
                                    />
                                    <p
                                        style={{
                                            fontFamily: "var(--font-body)",
                                            fontWeight: 500,
                                            fontSize: 14,
                                            color: "var(--text)",
                                        }}
                                    >
                                        {setting.label}
                                    </p>
                                </div>
                                {setting.desc && (
                                    <p
                                        style={{
                                            fontSize: 12,
                                            color: "var(--text-secondary)",
                                            marginTop: 6,
                                            marginLeft: 28,
                                        }}
                                    >
                                        {setting.desc}
                                    </p>
                                )}
                            </div>
                            <Settings size={16} style={{ color: "var(--text-secondary)" }} />
                        </button>
                    );
                })}
            </div>

            {/* Logout Section */}
            <div
                style={{
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: "var(--space-8)",
                }}
            >
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        marginBottom: "var(--space-4)",
                    }}
                >
                    SESIÓN
                </h3>

                {!showLogoutConfirm ? (
                    <Button
                        type="button"
                        variant="danger"
                        fullWidth
                        onClick={() => setShowLogoutConfirm(true)}
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </Button>
                ) : (
                    <div
                        style={{
                            background: "var(--surface-elevated)",
                            border: "1px solid var(--color-accent-alert)",
                            borderRadius: "var(--radius-md)",
                            padding: "var(--space-6)",
                        }}
                    >
                        <p
                            style={{
                                color: "var(--text)",
                                marginBottom: "var(--space-4)",
                                fontWeight: 500,
                            }}
                        >
                            ¿Estás seguro de que deseas cerrar sesión?
                        </p>
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setShowLogoutConfirm(false)}
                                style={{ flex: 1 }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                variant="danger"
                                onClick={handleLogout}
                                style={{ flex: 1 }}
                            >
                                <LogOut size={18} />
                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div
                style={{
                    background: "var(--surface-elevated)",
                    border: "1px dashed var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    padding: "var(--space-6)",
                    marginTop: "var(--space-8)",
                }}
            >
                <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    💡 <strong>Nota:</strong> Las opciones de Perfil, Modo de Cuenta, Fecha de Corte, Notificaciones y Apariencia están siendo desarrolladas. Cerrar Sesión está totalmente funcional.
                </p>
            </div>
        </div>
    );
}
