import Link from "next/link";

export default function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="w-full"
            style={{
                background: "var(--surface)",
                borderTop: "1px solid var(--border-color)",
            }}
        >
            <div
                className="app-container flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ padding: "var(--space-6) var(--space-6)" }}
            >
                {/* Logo + Copyright */}
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center justify-center rounded-md"
                        style={{
                            width: 28,
                            height: 28,
                            background: "var(--surface-elevated)",
                            border: "1px dashed var(--border-color)",
                            fontSize: 8,
                            color: "var(--text-secondary)",
                        }}
                    >
                        LOGO
                    </div>
                    <span
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        © {currentYear} FamilyFlow · MODUS AXON
                    </span>
                </div>

                {/* Links */}
                <nav className="flex items-center gap-4">
                    <Link
                        href="/terminos"
                        className="text-sm transition-colors hover:underline"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Términos
                    </Link>
                    <Link
                        href="/privacidad"
                        className="text-sm transition-colors hover:underline"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Privacidad
                    </Link>
                    <Link
                        href="/contacto"
                        className="text-sm transition-colors hover:underline"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Contacto
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
