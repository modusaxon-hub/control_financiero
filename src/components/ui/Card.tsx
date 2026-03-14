import { type ReactNode } from "react";

type CardVariant = "default" | "module" | "stat" | "nudge";

interface CardProps {
    variant?: CardVariant;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const variantStyles: Record<CardVariant, React.CSSProperties> = {
    default: {},
    module: {
        cursor: "pointer",
    },
    stat: {},
    nudge: {
        borderLeft: "4px solid var(--color-accent-warm)",
    },
};

export default function Card({
    variant = "default",
    children,
    className = "",
    onClick,
}: CardProps) {
    const Tag = onClick ? "button" : "div";

    return (
        <Tag
            onClick={onClick}
            className={`card-component ${className}`}
            style={{
                display: "block",
                width: "100%",
                textAlign: "left" as const,
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-4)",
                boxShadow: "var(--shadow-sm)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                ...variantStyles[variant],
            }}
            onMouseEnter={(e) => {
                if (variant === "module") {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                }
            }}
            onMouseLeave={(e) => {
                if (variant === "module") {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                }
            }}
        >
            {children}
        </Tag>
    );
}
