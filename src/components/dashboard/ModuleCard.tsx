"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface ModuleCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    accentColor: string;
    stat?: string;
    statLabel?: string;
}

export default function ModuleCard({
    title,
    description,
    icon: Icon,
    href,
    accentColor,
    stat,
    statLabel,
}: ModuleCardProps) {
    return (
        <Link
            href={href}
            className="block group"
            style={{
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-5)",
                boxShadow: "var(--shadow-sm)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                textDecoration: "none",
                color: "inherit",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
            }}
        >
            {/* Icon badge */}
            <div
                className="flex items-center justify-center rounded-xl mb-3"
                style={{
                    width: 48,
                    height: 48,
                    background: `${accentColor}15`,
                }}
            >
                <Icon size={24} strokeWidth={1.75} style={{ color: accentColor }} />
            </div>

            {/* Title */}
            <h3
                className="mb-1"
                style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "var(--text)",
                }}
            >
                {title}
            </h3>

            {/* Description */}
            <p
                className="mb-3"
                style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                }}
            >
                {description}
            </p>

            {/* Stat (optional) */}
            {stat && (
                <div
                    className="flex items-baseline gap-2 pt-3"
                    style={{ borderTop: "1px solid var(--border-color)" }}
                >
                    <span
                        className="text-money"
                        style={{
                            fontSize: 20,
                            color: accentColor,
                        }}
                    >
                        {stat}
                    </span>
                    {statLabel && (
                        <span
                            style={{
                                fontSize: 12,
                                color: "var(--text-secondary)",
                            }}
                        >
                            {statLabel}
                        </span>
                    )}
                </div>
            )}
        </Link>
    );
}
