import { PiggyBank, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ReservaPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                        Mi Reserva de Tranquilidad
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                        Metas de ahorro individuales y compartidas
                    </p>
                </div>
                <Button variant="success">
                    <Plus size={18} />
                    Nueva meta
                </Button>
            </div>

            {/* Empty state */}
            <div
                className="flex flex-col items-center justify-center text-center"
                style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-12) var(--space-6)",
                }}
            >
                <div
                    className="flex items-center justify-center rounded-2xl mb-4"
                    style={{
                        width: 64,
                        height: 64,
                        background: "rgba(16,185,129,0.1)",
                    }}
                >
                    <PiggyBank size={32} style={{ color: "var(--color-secondary)" }} />
                </div>
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 8,
                    }}
                >
                    Crea tu primera meta
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 320 }}>
                    Define metas como fondo de emergencia, vacaciones o compra de un bien.
                    La app calcula el aporte mensual sin romper tu presupuesto.
                </p>
            </div>
        </div>
    );
}
