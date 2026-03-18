"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

interface CreateShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateShoppingListModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateShoppingListModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const titulo = formData.get("titulo") as string;
    const presupuesto = formData.get("presupuesto") as string;

    try {
      // TODO: Implement createShoppingList Server Action
      // await createShoppingList({
      //   titulo,
      //   presupuesto: presupuesto ? parseFloat(presupuesto) : undefined,
      // });

      e.currentTarget.reset();
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear lista");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-8)",
          maxWidth: 500,
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: 18,
              color: "var(--text)",
            }}
          >
            Nueva Lista de Compras
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Título */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Nombre de la Lista
            </label>
            <input
              type="text"
              name="titulo"
              placeholder="Ej: Mercado Semanal, Tienda Online, etc"
              required
              style={{
                width: "100%",
                padding: "var(--space-3)",
                background: "var(--surface-elevated)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                color: "var(--text)",
              }}
            />
          </div>

          {/* Presupuesto */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Presupuesto (COP) - Opcional
            </label>
            <input
              type="number"
              name="presupuesto"
              placeholder="0.00"
              step="0.01"
              min="0"
              style={{
                width: "100%",
                padding: "var(--space-3)",
                background: "var(--surface-elevated)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                color: "var(--text)",
              }}
            />
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
              Define un límite de gasto para esta compra
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "var(--color-accent-alert)",
                color: "white",
                padding: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 mt-6">
            <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} style={{ flex: 1 }}>
              <Plus size={18} />
              {loading ? "Creando..." : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
