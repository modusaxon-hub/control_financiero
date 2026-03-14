import { Settings } from "lucide-react";

export default function ConfiguracionPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                    Configuración
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                    Preferencias de tu cuenta y de la app
                </p>
            </div>

            <div className="flex flex-col gap-3">
                {[
                    { label: "Perfil", desc: "Nombre, email y foto de perfil" },
                    { label: "Modo de Cuenta", desc: "Individual o Familiar" },
                    { label: "Fecha de Corte", desc: "Día de inicio de tu período de presupuesto" },
                    { label: "Notificaciones", desc: "Configurar nudges y alertas" },
                    { label: "Apariencia", desc: "Modo claro, oscuro o automático" },
                    { label: "Cerrar Sesión", desc: "" },
                ].map((item) => (
                    <button
                        key={item.label}
                        className="flex items-center justify-between text-left w-full"
                        style={{
                            background: "var(--surface)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "var(--radius-md)",
                            padding: "var(--space-4)",
                            cursor: "pointer",
                            transition: "background 0.15s",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: item.label === "Cerrar Sesión" ? "var(--color-accent-alert)" : "var(--text)",
                                }}
                            >
                                {item.label}
                            </p>
                            {item.desc && (
                                <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
                                    {item.desc}
                                </p>
                            )}
                        </div>
                        <Settings size={16} style={{ color: "var(--text-secondary)" }} />
                    </button>
                ))}
            </div>
        </div>
    );
}
