import { CalendarClock, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CompromisosFijosPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                        Compromisos Fijos
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                        Gastos recurrentes y cuotas de crédito
                    </p>
                </div>
                <Button>
                    <Plus size={18} />
                    Nuevo
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
                        background: "rgba(27,42,74,0.08)",
                    }}
                >
                    <CalendarClock size={32} style={{ color: "var(--color-primary)" }} />
                </div>
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 8,
                    }}
                >
                    Sin compromisos registrados
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 320 }}>
                    Agrega tu primer gasto recurrente (arriendo, servicios, cuotas)
                    para empezar a ver tu presupuesto organizado.
                </p>
            </div>
        </div>
    );
}
