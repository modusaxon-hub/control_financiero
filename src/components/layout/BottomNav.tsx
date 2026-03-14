"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CalendarClock,
    Receipt,
    PiggyBank,
    TrendingDown,
    ShoppingBasket,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
    { href: "/despensa", label: "Despensa", icon: ShoppingBasket },
    { href: "/compromisos-fijos", label: "Comprom.", icon: CalendarClock },
    { href: "/reserva", label: "Reserva", icon: PiggyBank },
    { href: "/deudas", label: "Deudas", icon: TrendingDown },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 lg:hidden flex items-stretch justify-around"
            style={{
                height: "var(--bottom-nav-height)",
                background: "var(--surface)",
                borderTop: "1px solid var(--border-color)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                zIndex: "var(--z-nav)" as string,
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
        >
            {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center justify-center gap-1 flex-1 relative transition-colors"
                        style={{
                            color: isActive
                                ? "var(--color-primary)"
                                : "var(--text-secondary)",
                            fontFamily: "var(--font-body)",
                            fontSize: 11,
                            fontWeight: isActive ? 600 : 400,
                        }}
                    >
                        {/* Active indicator */}
                        {isActive && (
                            <span
                                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full"
                                style={{
                                    width: 32,
                                    height: 3,
                                    background: "var(--color-primary)",
                                }}
                            />
                        )}
                        <Icon size={22} strokeWidth={isActive ? 2 : 1.75} />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
