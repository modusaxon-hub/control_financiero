"use client";

import { useState } from "react";
import { Receipt, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import CreateGastoModal from "@/components/modals/CreateGastoModal";

export default function GastosEsporadicosPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <CreateGastoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tipoGasto="esporadico"
                onSuccess={() => {
                    // TODO: Refetch gastos list
                }}
            />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                        Gastos Esporádicos
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                        Gastos no periódicos y suscripciones digitales
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
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
                        background: "rgba(245,158,11,0.1)",
                    }}
                >
                    <Receipt size={32} style={{ color: "var(--color-accent-warm)" }} />
                </div>
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 8,
                    }}
                >
                    Sin gastos esporádicos
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 320 }}>
                    Registra gastos no previstos y lleva el control de tus suscripciones
                    de IA y herramientas digitales.
                </p>
            </div>
        </div>
    );
}
