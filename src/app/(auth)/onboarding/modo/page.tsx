"use client";

import { useState } from "react";
import { User, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { setupFamily } from "@/lib/onboarding-actions";

type AccountMode = "individual" | "familiar" | null;

export default function OnboardingModoPage() {
    const [selected, setSelected] = useState<AccountMode>(null);

    return (
        <div className="w-full" style={{ maxWidth: 480 }}>
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((step) => (
                    <div
                        key={step}
                        className="flex items-center gap-2"
                    >
                        <div
                            className="flex items-center justify-center rounded-full"
                            style={{
                                width: 32,
                                height: 32,
                                background: step === 1 ? "var(--color-primary)" : "var(--surface-elevated)",
                                color: step === 1 ? "#FFFFFF" : "var(--text-secondary)",
                                fontFamily: "var(--font-heading)",
                                fontWeight: 600,
                                fontSize: 13,
                            }}
                        >
                            {step}
                        </div>
                        {step < 3 && (
                            <div
                                style={{
                                    width: 40,
                                    height: 2,
                                    background: "var(--border-color)",
                                    borderRadius: 1,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>

            <h1
                className="text-center mb-2"
                style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: 24,
                    color: "var(--text)",
                }}
            >
                ¿Cómo usarás FamilyFlow?
            </h1>
            <p
                className="text-center mb-8"
                style={{ color: "var(--text-secondary)", fontSize: 14 }}
            >
                Puedes cambiar esto después en Configuración
            </p>

            <form action={setupFamily} className="w-full">
                {/* Options */}
                <div className="flex flex-col gap-4 mb-8">
                    {/* Individual */}
                    <button
                        type="button"
                        onClick={() => setSelected("individual")}
                        className="text-left"
                        style={{
                            background: "var(--surface)",
                            border: `2px solid ${selected === "individual" ? "var(--color-primary)" : "var(--border-color)"}`,
                            borderRadius: "var(--radius-lg)",
                            padding: "var(--space-5)",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                            boxShadow: selected === "individual" ? "0 0 0 3px rgba(27,42,74,0.12)" : "none",
                            cursor: "pointer",
                        }}
                    >
                        {/* Hidden input for formData */}
                        <input type="radio" name="mode" value="individual" checked={selected === "individual"} className="hidden" readOnly />
                        <div className="flex items-start gap-4">
                            <div
                                className="flex items-center justify-center rounded-xl shrink-0"
                                style={{
                                    width: 48,
                                    height: 48,
                                    background: selected === "individual" ? "var(--color-primary)" : "var(--surface-elevated)",
                                    color: selected === "individual" ? "#FFFFFF" : "var(--text-secondary)",
                                    transition: "all 0.2s",
                                }}
                            >
                                <User size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3
                                        style={{
                                            fontFamily: "var(--font-heading)",
                                            fontWeight: 600,
                                            fontSize: 16,
                                            color: "var(--text)",
                                        }}
                                    >
                                        Individual
                                    </h3>
                                    {selected === "individual" && (
                                        <CheckCircle2 size={20} style={{ color: "var(--color-primary)" }} />
                                    )}
                                </div>
                                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>
                                    Lleva tus finanzas personales de forma privada. Ideal si vives solo.
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Familiar */}
                    <button
                        type="button"
                        onClick={() => setSelected("familiar")}
                        className="text-left"
                        style={{
                            background: "var(--surface)",
                            border: `2px solid ${selected === "familiar" ? "var(--color-secondary)" : "var(--border-color)"}`,
                            borderRadius: "var(--radius-lg)",
                            padding: "var(--space-5)",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                            boxShadow: selected === "familiar" ? "0 0 0 3px rgba(16,185,129,0.12)" : "none",
                            cursor: "pointer",
                        }}
                    >
                        <input type="radio" name="mode" value="familiar" checked={selected === "familiar"} className="hidden" readOnly />
                        <div className="flex items-start gap-4">
                            <div
                                className="flex items-center justify-center rounded-xl shrink-0"
                                style={{
                                    width: 48,
                                    height: 48,
                                    background: selected === "familiar" ? "var(--color-secondary)" : "var(--surface-elevated)",
                                    color: selected === "familiar" ? "#FFFFFF" : "var(--text-secondary)",
                                    transition: "all 0.2s",
                                }}
                            >
                                <Users size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3
                                        style={{
                                            fontFamily: "var(--font-heading)",
                                            fontWeight: 600,
                                            fontSize: 16,
                                            color: "var(--text)",
                                        }}
                                    >
                                        Familiar
                                    </h3>
                                    {selected === "familiar" && (
                                        <CheckCircle2 size={20} style={{ color: "var(--color-secondary)" }} />
                                    )}
                                </div>
                                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>
                                    Invita a los miembros de tu hogar. Controlen el presupuesto familiar juntos.
                                </p>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Conditional Family Name Input */}
                {selected === "familiar" && (
                    <div className="mb-8 animate-in fade-in slide-in-from-top-2">
                        <label className="block mb-2 text-sm font-medium">Nombre del Núcleo Familiar</label>
                        <input
                            type="text"
                            name="familyName"
                            placeholder="Ej: Familia García, Hogar Martínez..."
                            required
                            className="w-full px-4 py-3 rounded-xl border bg-surface outline-none focus:ring-2 focus:ring-emerald-500/20"
                            style={{ borderColor: "var(--border-color)", background: "var(--surface)" }}
                        />
                    </div>
                )}

                {selected === "individual" && <input type="hidden" name="familyName" value="Mi Hogar" />}

                <Button
                    type="submit"
                    disabled={!selected}
                    fullWidth
                >
                    Finalizar Configuración
                    <ArrowRight size={18} />
                </Button>
            </form>
        </div>
    );
}
