"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { crearMeta } from "@/lib/actions/metas-actions";

interface CreateMetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateMetaModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateMetaModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipoMeta, setTipoMeta] = useState<"individual" | "compartida">("individual");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get("nombre") as string,
      descripcion: formData.get("descripcion") as string || undefined,
      monto_objetivo: parseFloat(formData.get("monto_objetivo") as string),
      fecha_limite: formData.get("fecha_limite") ? new Date(formData.get("fecha_limite") as string) : undefined,
      tipo_meta: tipoMeta as "individual" | "compartida",
      participantes: tipoMeta === "compartida"
        ? (formData.get("participantes") as string)?.split(",").filter(Boolean) || []
        : [],
      icono: formData.get("icono") as string || "piggy-bank",
    };

    try {
      await crearMeta(data);
      e.currentTarget.reset();
      setTipoMeta("individual");
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear meta");
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
            Nueva Meta de Ahorro
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
          {/* Nombre */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Nombre de la Meta
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Viaje a Disney, Casa propia, Auto"
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

          {/* Descripción */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Descripción (Opcional)
            </label>
            <textarea
              name="descripcion"
              placeholder="Describe los detalles de tu meta"
              style={{
                width: "100%",
                padding: "var(--space-3)",
                background: "var(--surface-elevated)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                color: "var(--text)",
                minHeight: 80,
                fontFamily: "var(--font-body)",
                resize: "vertical",
              }}
            />
          </div>

          {/* Monto Objetivo */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Monto Objetivo (COP)
            </label>
            <input
              type="number"
              name="monto_objetivo"
              placeholder="0.00"
              step="0.01"
              min="0"
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

          {/* Fecha Límite */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Fecha Límite (Opcional)
            </label>
            <input
              type="date"
              name="fecha_limite"
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

          {/* Tipo de Meta */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Tipo de Meta
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setTipoMeta("individual")}
                style={{
                  flex: 1,
                  padding: "var(--space-3)",
                  background: tipoMeta === "individual" ? "var(--color-primary)" : "var(--surface-elevated)",
                  border: `1px solid ${tipoMeta === "individual" ? "var(--color-primary)" : "var(--border-color)"}`,
                  borderRadius: "var(--radius-md)",
                  color: tipoMeta === "individual" ? "white" : "var(--text)",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => setTipoMeta("compartida")}
                style={{
                  flex: 1,
                  padding: "var(--space-3)",
                  background: tipoMeta === "compartida" ? "var(--color-success)" : "var(--surface-elevated)",
                  border: `1px solid ${tipoMeta === "compartida" ? "var(--color-success)" : "var(--border-color)"}`,
                  borderRadius: "var(--radius-md)",
                  color: tipoMeta === "compartida" ? "white" : "var(--text)",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Compartida
              </button>
            </div>
          </div>

          {/* Ícono */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Ícono (Nombre Lucide)
            </label>
            <input
              type="text"
              name="icono"
              placeholder="piggy-bank"
              defaultValue="piggy-bank"
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
              Ej: piggy-bank, home, car, plane, heart, target
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
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
