"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            Política de Privacidad
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
              1. Introducción
            </h2>
            <p>
              En FamilyFlow, nos tomamos en serio tu privacidad. Esta política explica cómo recopilamos, usamos, almacenamos y protegemos tu información personal en cumplimiento con la Ley 1581 de 2012 de Colombia.
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
              2. Información que Recopilamos
            </h2>
            <p>Recopilamos los siguientes tipos de información:</p>
            <ul style={{ marginLeft: "var(--space-6)", marginTop: "var(--space-3)" }}>
              <li>• Datos de identificación: nombre, email, contraseña</li>
              <li>• Datos financieros: ingresos, gastos, créditos, metas de ahorro</li>
              <li>• Datos familiares: estructura del hogar, roles de miembros</li>
              <li>• Datos técnicos: dirección IP, tipo de dispositivo, navegador</li>
            </ul>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              3. Finalidad del Uso
            </h2>
            <p>
              Tu información se utiliza exclusivamente para proporcionar el servicio de gestión financiera familiar. No compartimos datos con terceros sin tu consentimiento expreso, excepto cuando es requerido por ley.
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
              4. Privacidad Financiera
            </h2>
            <p>
              <strong>IMPORTANTE:</strong> Tu información financiera es 100% privada. Solo TÚ puedes ver tus datos. Ni siquiera otros miembros de tu familia pueden ver tus registros financieros sin tu autorización explícita. El administrador de la familia solo ve datos consolidados de la familia, no información individual.
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
              5. Seguridad de Datos
            </h2>
            <p>
              Implementamos encriptación de extremo a extremo y Row Level Security (RLS) en nuestra base de datos PostgreSQL. Todos los datos se almacenan en servidores seguros de Supabase con cumplimiento de estándares internacionales.
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
              6. Derechos de Habeas Data (Ley 1581)
            </h2>
            <p>Según la legislación colombiana, tienes derecho a:</p>
            <ul style={{ marginLeft: "var(--space-6)", marginTop: "var(--space-3)" }}>
              <li>• Conocer qué datos tenemos sobre ti</li>
              <li>• Actualizar tu información</li>
              <li>• Rectificar datos incorrectos</li>
              <li>• Solicitar la eliminación de tu cuenta</li>
            </ul>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              7. Cookies y Rastreo
            </h2>
            <p>
              FamilyFlow utiliza cookies de sesión para autenticación. No utilizamos cookies de rastreo publicitario. Puedes desactivar cookies en tu navegador, pero esto puede afectar la funcionalidad.
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
              8. Terceros y Integraciones
            </h2>
            <p>
              Utilizamos los siguientes servicios externos (bajo acuerdos de procesamiento de datos):
            </p>
            <ul style={{ marginLeft: "var(--space-6)", marginTop: "var(--space-3)" }}>
              <li>• Supabase: Autenticación y base de datos</li>
              <li>• Google OAuth: Login opcional</li>
              <li>• Brevo: Envío de emails (cuando se implemente)</li>
            </ul>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                marginBottom: "var(--space-4)",
                marginTop: "var(--space-6)",
              }}
            >
              9. Retención de Datos
            </h2>
            <p>
              Los datos se retienen mientras tu cuenta esté activa. Si eliminas tu cuenta, los datos se borran dentro de 30 días, a menos que estemos obligados a retenerlos por ley.
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
              10. Contacto
            </h2>
            <p>
              Si tienes preguntas sobre tu privacidad, contacta a nuestro equipo a través del formulario de contacto en la plataforma.
            </p>

            <hr style={{ margin: "var(--space-8) 0", borderColor: "var(--border-color)" }} />

            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: "var(--space-8)" }}>
              © 2026 MODUS AXON. Todos los derechos reservados.
              <br />
              Cumplimiento: Ley 1581 de 2012, Decreto 1377 de 2013 (Colombia)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
