"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { registrarCredito } from "@/lib/actions/creditos-actions";

interface CreateCreditoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateCreditoModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateCreditoModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const tipo = formData.get("tipo") as "libre_inversion" | "hipotecario" | "educativo" | "tarjeta";
    const data = {
      tipo,
      entidad: formData.get("entidad") as string,
      saldo_capital: parseFloat(formData.get("saldo_capital") as string),
      tasa_ea: parseFloat(formData.get("tasa_ea") as string),
      plazo_meses: parseInt(formData.get("plazo_meses") as string),
      cuota_mensual: parseFloat(formData.get("cuota_mensual") as string),
      fecha_inicio: new Date(formData.get("fecha_inicio") as string),
    };

    try {
      await registrarCredito(data);
      e.currentTarget.reset();
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar crédito");
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
            Nuevo Crédito / Deuda
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
          {/* Tipo de Crédito */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Tipo de Crédito
            </label>
            <select
              name="tipo"
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
              <option value="">Seleccionar tipo</option>
              <option value="libre_inversion">Libre Inversión</option>
              <option value="hipotecario">Hipotecario</option>
              <option value="educativo">Educativo</option>
              <option value="tarjeta">Tarjeta de Crédito</option>
            </select>
          </div>

          {/* Entidad */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Entidad Financiera
            </label>
            <input
              type="text"
              name="entidad"
              placeholder="Ej: Banco Colombiano, Bancolombia, etc"
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

          {/* Saldo Capital */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Saldo Capital (COP)
            </label>
            <input
              type="number"
              name="saldo_capital"
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

          {/* Tasa EA */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Tasa EA (%) - Ej: 0.12 para 12%
            </label>
            <input
              type="number"
              name="tasa_ea"
              placeholder="0.12"
              step="0.01"
              min="0"
              max="100"
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

          {/* Plazo Meses */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Plazo (Meses)
            </label>
            <input
              type="number"
              name="plazo_meses"
              placeholder="60"
              min="1"
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

          {/* Cuota Mensual */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Cuota Mensual (COP)
            </label>
            <input
              type="number"
              name="cuota_mensual"
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

          {/* Fecha Inicio */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="fecha_inicio"
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
