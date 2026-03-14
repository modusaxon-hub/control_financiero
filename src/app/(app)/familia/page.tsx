import { Users, UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FamiliaPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                        Mi Familia
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                        Miembros del hogar, roles y aportes
                    </p>
                </div>
                <Button>
                    <UserPlus size={18} />
                    Invitar
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
                        background: "rgba(139,92,246,0.1)",
                    }}
                >
                    <Users size={32} style={{ color: "#8B5CF6" }} />
                </div>
                <h3
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 8,
                    }}
                >
                    Tu núcleo familiar
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 320 }}>
                    Invita a los integrantes de tu hogar y define cómo cada uno
                    aporta al presupuesto familiar.
                </p>
            </div>
        </div>
    );
}
