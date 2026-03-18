"use client";

import { useState } from "react";
import { TrendingDown, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import CreateCreditoModal from "@/components/modals/CreateCreditoModal";

export default function DeudasPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <CreateCreditoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    // TODO: Refetch creditos list
                }}
            />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                        Plan de Desendeudamiento
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                        Créditos activos y estrategia de salida
                    </p>
                </div>
                <Button variant="danger" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} />
                    Nuevo crédito
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
                        background: "rgba(239,68,68,0.1)",
                    }}
                >
                    <TrendingDown size={32} style={{ color: "var(--color-accent-alert)" }} />
                </div>
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 8,
                    }}
                >
                    Sin créditos registrados
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 320 }}>
                    Registra tus créditos activos para ver la tabla de amortización
                    y encontrar la estrategia óptima de pago.
                </p>
            </div>
        </div>
    );
}
