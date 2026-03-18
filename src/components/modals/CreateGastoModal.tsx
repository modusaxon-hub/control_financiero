"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { registrarGasto } from "@/lib/actions/gastos-actions";

interface CreateGastoModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipoGasto: "recurrente" | "esporadico";
  onSuccess?: () => void;
}

export default function CreateGastoModal({
  isOpen,
  onClose,
  tipoGasto,
  onSuccess,
}: CreateGastoModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const frecuenciaValue = tipoGasto === "recurrente" ? (formData.get("frecuencia") as "semanal" | "quincenal" | "mensual" | "bimestral" | "anual") : undefined;
    const data = {
      descripcion: formData.get("descripcion") as string,
      categoria: formData.get("categoria") as string,
      monto: parseFloat(formData.get("monto") as string),
      fecha: new Date(formData.get("fecha") as string),
      tipo_gasto: tipoGasto as "recurrente" | "esporadico",
      ambito: (formData.get("ambito") as "individual" | "familiar") || "individual",
      frecuencia: frecuenciaValue,
      dia_vencimiento: tipoGasto === "recurrente" ? parseInt(formData.get("dia_vencimiento") as string) : undefined,
      es_cuota: false,
    };

    try {
      await registrarGasto(data);
      e.currentTarget.reset();
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar gasto");
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
            {tipoGasto === "recurrente" ? "Nuevo Compromiso Fijo" : "Nuevo Gasto"}
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
          {/* Descripción */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Descripción
            </label>
            <input
              type="text"
              name="descripcion"
              placeholder="Ej: Arriendo, Groceries, etc"
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

          {/* Categoría */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Categoría
            </label>
            <select
              name="categoria"
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
            >
              <option value="">Seleccionar categoría</option>
              <option value="vivienda">Vivienda</option>
              <option value="transporte">Transporte</option>
              <option value="alimentacion">Alimentación</option>
              <option value="salud">Salud</option>
              <option value="educacion">Educación</option>
              <option value="entretenimiento">Entretenimiento</option>
              <option value="servicios">Servicios</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          {/* Monto */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Monto (COP)
            </label>
            <input
              type="number"
              name="monto"
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

          {/* Fecha */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
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

          {/* Ámbito */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Ámbito
            </label>
            <select
              name="ambito"
              style={{
                width: "100%",
                padding: "var(--space-3)",
                background: "var(--surface-elevated)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                color: "var(--text)",
              }}
            >
              <option value="individual">Individual</option>
              <option value="familiar">Familiar</option>
            </select>
          </div>

          {/* Frecuencia (si es recurrente) */}
          {tipoGasto === "recurrente" && (
            <>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                  Frecuencia
                </label>
                <select
                  name="frecuencia"
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
                >
                  <option value="">Seleccionar frecuencia</option>
                  <option value="semanal">Semanal</option>
                  <option value="quincenal">Quincenal</option>
                  <option value="mensual">Mensual</option>
                  <option value="bimestral">Bimestral</option>
                  <option value="anual">Anual</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                  Día de Vencimiento (1-31)
                </label>
                <input
                  type="number"
                  name="dia_vencimiento"
                  min="1"
                  max="31"
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
            </>
          )}

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
