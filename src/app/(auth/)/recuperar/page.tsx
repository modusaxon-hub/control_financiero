"use client";

import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function RecuperarPage() {
  return (
    <div className="w-full" style={{ maxWidth: 420 }}>
      {/* Logo + Brand */}
      <div className="text-center mb-8">
        <div
          className="mx-auto mb-4 flex items-center justify-center rounded-2xl"
          style={{
            width: 72,
            height: 72,
            background: "var(--color-primary)",
            color: "#FFFFFF",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: 12,
            border: "2px dashed rgba(255,255,255,0.3)",
          }}
        >
          LOGO
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: 28,
            color: "var(--color-info)",
            marginBottom: 4,
          }}
        >
          FamilyFlow
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          Tu copiloto financiero familiar
        </p>
      </div>

      {/* Recovery Card */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-8)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <h2
          className="mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Recuperar Contraseña
        </h2>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 14,
            marginBottom: "var(--space-6)",
            textAlign: "center",
          }}
        >
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <form className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label
              className="block mb-1.5"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              Correo electrónico
            </label>
            <div
              className="flex items-center gap-3 px-3"
              style={{
                background: "var(--surface-elevated)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                height: 48,
              }}
            >
              <Mail size={18} style={{ color: "var(--text-secondary)" }} />
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                required
                className="flex-1 bg-transparent outline-none"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--text)",
                }}
              />
            </div>
          </div>

          {/* Info */}
          <p
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              fontStyle: "italic",
            }}
          >
            📧 Revisa tu bandeja de entrada y spam. El enlace de recuperación expira en 24 horas.
          </p>

          {/* Submit */}
          <Button type="button" fullWidth>
            <Mail size={18} />
            Enviar enlace de recuperación
          </Button>
        </form>

        {/* Back to login */}
        <div style={{ textAlign: "center", marginTop: "var(--space-6)" }}>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm hover:underline"
            style={{ color: "var(--color-info)", fontWeight: 500 }}
          >
            <ArrowLeft size={16} />
            Volver a iniciar sesión
          </Link>
        </div>
      </div>

      {/* Note */}
      <p
        style={{
          fontSize: 12,
          color: "var(--text-secondary)",
          textAlign: "center",
          marginTop: "var(--space-8)",
        }}
      >
        ⚠️ Nota: La recuperación de contraseña requiere configuración de Brevo para envío de emails.
      </p>
    </div>
  );
}
