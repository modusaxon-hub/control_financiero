"use client";

import Link from "next/link";
import { User } from "lucide-react";

export default function AppHeader() {
    return (
        <header
            className="sticky top-0 z-50 flex items-center justify-between px-4 lg:px-6"
            style={{
                height: "var(--header-height)",
                background: "var(--color-primary)",
                color: "#FFFFFF",
            }}
        >
            {/* Logo placeholder */}
            <Link href="/dashboard" className="flex items-center gap-3">
                <div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                        width: 36,
                        height: 36,
                        background: "rgba(255,255,255,0.15)",
                        border: "1px dashed rgba(255,255,255,0.4)",
                        fontSize: 10,
                        color: "rgba(255,255,255,0.6)",
                    }}
                >
                    LOGO
                </div>
                <span
                    className="text-lg tracking-tight"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                    FamilyFlow
                </span>
            </Link>

            {/* User avatar */}
            <button
                className="flex items-center justify-center rounded-full transition-colors"
                style={{
                    width: 36,
                    height: 36,
                    background: "rgba(255,255,255,0.12)",
                }}
                aria-label="Perfil de usuario"
            >
                <User size={20} strokeWidth={1.75} />
            </button>
        </header>
    );
}
