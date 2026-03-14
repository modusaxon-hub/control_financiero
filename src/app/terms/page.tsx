"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)", padding: "var(--space-8)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm mb-6 hover:underline"
            style={{ color: "var(--color-info)", fontWeight: 500 }}
          >
            <ArrowLeft size={16} />
            Volver
          </Link>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 32,
              color: "var(--text)",
              marginBottom: "var(--space-4)",
            }}
          >
            Términos de Servicio
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            Última actualización: 14 de Marzo de 2026
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-8)",
          }}
        >
          <div style={{ lineHeight: 1.8, color: "var(--text)" }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              1. Aceptación de Términos
            </h2>
            <p>
              Al acceder y utilizar FamilyFlow, usted acepta estos términos y condiciones de servicio. Si no está de acuerdo con alguna parte de estos términos, no puede usar la plataforma.
            </p>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              2. Descripción del Servicio
            </h2>
            <p>
              FamilyFlow es una plataforma de gestión financiera familiar que permite a los usuarios llevar un control de ingresos, egresos, metas de ahorro y análisis de deudas.
            </p>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              3. Cuentas de Usuario
            </h2>
            <p>
              Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de toda la actividad que ocurra bajo su cuenta. Debe notificar inmediatamente cualquier uso no autorizado.
            </p>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              4. Uso Aceptable
            </h2>
            <p>
              Usted se compromete a no utilizar FamilyFlow para actividades ilícitas, fraude, acoso, o cualquier otra actividad que viole leyes aplicables.
            </p>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              5. Limitación de Responsabilidad
            </h2>
            <p>
              FamilyFlow proporciona la plataforma "tal como está" sin garantías de ningún tipo. No somos responsables por pérdidas financieras derivadas del uso de nuestro servicio o por información proporcionada por el usuario.
            </p>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              6. Privacidad de Datos
            </h2>
            <p>
              Tu privacidad es importante. Lee nuestra Política de Privacidad para entender cómo recopilamos, usamos y protegemos tu información.
            </p>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              7. Cambios en los Términos
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios significativos serán comunicados a través de la plataforma.
            </p>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              8. Contacto
            </h2>
            <p>
              Si tienes preguntas sobre estos términos, por favor contacta a nuestro equipo a través del formulario de contacto en la plataforma.
            </p>

            <hr style={{ margin: "var(--space-8) 0", borderColor: "var(--border-color)" }} />

            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: "var(--space-8)" }}>
              © 2026 MODUS AXON. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
