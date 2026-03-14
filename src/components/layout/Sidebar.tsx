"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CalendarClock,
    Receipt,
    PiggyBank,
    TrendingDown,
    Users,
    Settings,
    ShoppingBasket,
} from "lucide-react";

const sidebarItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/despensa", label: "Despensa Familiar", icon: ShoppingBasket },
    { href: "/compromisos-fijos", label: "Compromisos Fijos", icon: CalendarClock },
    { href: "/gastos-esporadicos", label: "Gastos Esporádicos", icon: Receipt },
    { href: "/reserva", label: "Mi Reserva", icon: PiggyBank },
    { href: "/deudas", label: "Plan Deudas", icon: TrendingDown },
    { href: "/familia", label: "Familia", icon: Users },
    { href: "/configuracion", label: "Configuración", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="hidden lg:flex flex-col fixed top-[var(--header-height)] left-0 bottom-0"
            style={{
                width: 240,
                background: "var(--surface)",
                borderRight: "1px solid var(--border-color)",
                padding: "var(--space-4) 0",
                zIndex: "var(--z-nav)" as string,
            }}
        >
            <nav className="flex flex-col gap-1 px-3">
                {sidebarItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                            style={{
                                background: isActive ? "var(--color-primary-50)" : "transparent",
                                color: isActive ? "var(--color-primary)" : "var(--text-secondary)",
                                fontFamily: "var(--font-body)",
                                fontSize: 14,
                                fontWeight: isActive ? 600 : 400,
                            }}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2 : 1.75} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
