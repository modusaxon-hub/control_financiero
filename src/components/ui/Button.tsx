import { type ReactNode, type ButtonHTMLAttributes, type CSSProperties } from "react";

type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: ReactNode;
    fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
    primary: {
        background: "var(--color-primary)",
        color: "#FFFFFF",
        border: "none",
    },
    secondary: {
        background: "transparent",
        color: "var(--color-primary)",
        border: "1.5px solid var(--color-primary)",
    },
    success: {
        background: "var(--color-secondary)",
        color: "#FFFFFF",
        border: "none",
    },
    danger: {
        background: "var(--color-accent-alert)",
        color: "#FFFFFF",
        border: "none",
    },
    ghost: {
        background: "transparent",
        color: "var(--text)",
        border: "none",
    },
};

export default function Button({
    variant = "primary",
    children,
    fullWidth = false,
    className = "",
    style,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`btn-component ${className}`}
            style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 24px",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s ease",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-2)",
                whiteSpace: "nowrap",
                width: fullWidth ? "100%" : "auto",
                opacity: props.disabled ? 0.5 : 1,
                ...variantStyles[variant],
                ...style as CSSProperties,
            }}
            {...props}
        >
            {children}
        </button>
    );
}
