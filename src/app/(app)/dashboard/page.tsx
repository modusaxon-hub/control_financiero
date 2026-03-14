"use client";

import {
    CalendarClock,
    Receipt,
    PiggyBank,
    TrendingDown,
    Users,
    Bot,
    ShoppingBasket,
} from "lucide-react";
import ModuleCard from "@/components/dashboard/ModuleCard";

const modules = [
    {
        title: "Despensa Familiar",
        description: "Listas de compra, optimización de precios AI y carga de facturas.",
        icon: ShoppingBasket,
        href: "/despensa",
        accentColor: "#10B981",
        stat: "Nuevo",
        statLabel: "Logística",
    },
    {
        title: "Compromisos Fijos",
        description: "Gastos recurrentes, cuotas y análisis de conveniencia de crédito.",
        icon: CalendarClock,
        href: "/compromisos-fijos",
        accentColor: "#1B2A4A",
        stat: "$0",
        statLabel: "este mes",
    },
    {
        title: "Gastos Esporádicos",
        description: "Registra gastos no periódicos y controla suscripciones de IA.",
        icon: Receipt,
        href: "/gastos-esporadicos",
        accentColor: "#F59E0B",
        stat: "$0",
        statLabel: "este mes",
    },
    {
        title: "Mi Reserva",
        description: "Metas de ahorro individuales y compartidas. Tu fondo de tranquilidad.",
        icon: PiggyBank,
        href: "/reserva",
        accentColor: "#6366F1",
        stat: "0%",
        statLabel: "progreso",
    },
    {
        title: "Plan de Deudas",
        description: "Créditos activos y estrategia de desendeudamiento.",
        icon: TrendingDown,
        href: "/deudas",
        accentColor: "#EF4444",
        stat: "$0",
        statLabel: "saldo total",
    },
    {
        title: "Familia e IA",
        description: "Gestión de miembros y Asistente Predictivo de renta.",
        icon: Bot,
        href: "/familia",
        accentColor: "#8B5CF6",
    },
];

export default function DashboardPage() {
    return (
        <div>
            {/* Welcome section */}
            <div className="mb-8">
                <h1
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        marginBottom: 4,
                    }}
                >
                    Buenos días 👋
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                    Aquí está el resumen de tus finanzas
                </p>
            </div>

            {/* Summary cards */}
            <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
            >
                {/* Balance */}
                <div
                    className="col-span-2"
                    style={{
                        background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
                        borderRadius: "var(--radius-lg)",
                        padding: "var(--space-5)",
                        color: "#FFFFFF",
                    }}
                >
                    <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Balance del mes</p>
                    <p
                        className="text-money"
                        style={{ fontSize: 32, color: "#FFFFFF" }}
                    >
                        $0
                    </p>
                    <p style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
                        Ingresos: $0 · Gastos: $0
                    </p>
                </div>

                {/* Tranquility indicator */}
                <div
                    style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-lg)",
                        padding: "var(--space-4)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        className="flex items-center justify-center rounded-full mb-2"
                        style={{
                            width: 56,
                            height: 56,
                            background: "var(--color-secondary-light)",
                            fontFamily: "var(--font-heading)",
                            fontWeight: 700,
                            fontSize: 22,
                            color: "var(--color-secondary)",
                        }}
                    >
                        --
                    </div>
                    <p style={{ fontSize: 11, color: "var(--text-secondary)", textAlign: "center" }}>
                        Pulso Financiero
                    </p>
                </div>

                {/* Next due */}
                <div
                    style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-lg)",
                        padding: "var(--space-4)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>
                        Próximo vencimiento
                    </p>
                    <p
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 600,
                            fontSize: 14,
                            color: "var(--text)",
                        }}
                    >
                        Sin compromisos
                    </p>
                    <p style={{ fontSize: 11, color: "var(--color-secondary)" }}>
                        ¡Todo al día! ✓
                    </p>
                </div>
            </div>

            {/* Module cards grid */}
            <h2
                className="mb-4"
                style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: 18,
                }}
            >
                Módulos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((mod) => (
                    <ModuleCard key={mod.href} {...mod} />
                ))}
            </div>
        </div>
    );
}
