"use client";

import { useState } from "react";
import { X, Plus, Copy, Check } from "lucide-react";
import Button from "@/components/ui/Button";

interface CreateInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  codigoInvite?: string;
}

export default function CreateInviteModal({
  isOpen,
  onClose,
  onSuccess,
  codigoInvite,
}: CreateInviteModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      // TODO: Implement invitarMiembro Server Action in familia-actions.ts
      // await invitarMiembro(email);
      setSuccess(`Invitación enviada a ${email}`);
      e.currentTarget.reset();
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar invitación");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            Invitar a la Familia
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

        {/* Info */}
        <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: "var(--space-6)" }}>
          Invita a miembros de tu familia a través de su correo electrónico o comparte un enlace.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            style={{
              flex: 1,
              padding: "var(--space-3)",
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Por Email
          </button>
          <button
            type="button"
            onClick={() => {
              const link = `${window.location.origin}/familia?codigo=${codigoInvite || ""}`;
              setInviteLink(link);
            }}
            style={{
              flex: 1,
              padding: "var(--space-3)",
              background: "var(--surface-elevated)",
              color: "var(--text)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-elevated)";
              e.currentTarget.style.borderColor = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--surface-elevated)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            Por Enlace
          </button>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="miembro@example.com"
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

          {/* Rol */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
              Rol en la Familia
            </label>
            <select
              name="rol"
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
              <option value="miembro">Miembro</option>
              <option value="admin">Administrador</option>
              <option value="visualizador">Solo Visualización</option>
            </select>
          </div>

          {/* Success */}
          {success && (
            <div
              style={{
                background: "var(--color-success)",
                color: "white",
                padding: "var(--space-3)",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
              }}
            >
              ✓ {success}
            </div>
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
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>

        {/* Link Section */}
        {inviteLink && (
          <div
            style={{
              background: "var(--surface-elevated)",
              border: "1px dashed var(--border-color)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-4)",
              marginTop: "var(--space-6)",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 8 }}>
              Enlace de Invitación:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                style={{
                  flex: 1,
                  padding: "var(--space-3)",
                  background: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  fontFamily: "monospace",
                }}
              />
              <button
                type="button"
                onClick={handleCopyLink}
                style={{
                  padding: "var(--space-3)",
                  background: "var(--color-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
