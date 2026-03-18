"use client";

import { useState } from "react";
import {
    ShoppingBasket,
    Plus,
    Camera,
    FileText,
    History,
    Star,
    Store,
    ArrowRight,
    TrendingDown
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CreateShoppingListModal from "@/components/modals/CreateShoppingListModal";

export default function DespensaPage() {
    const [activeTab, setActiveTab] = useState<"listas" | "analisis">("listas");
    const [isShoppingListModalOpen, setIsShoppingListModalOpen] = useState(false);

    return (
        <div className="pb-20">
            <CreateShoppingListModal
                isOpen={isShoppingListModalOpen}
                onClose={() => setIsShoppingListModalOpen(false)}
                onSuccess={() => {
                    // TODO: Refetch shopping lists
                }}
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                        Despensa Familiar
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                        Logística de suministros y optimización de precios AI
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        className="flex-1 md:flex-none"
                        onClick={() => alert("🔄 OCR Escanear: Esta funcionalidad será implementada en Phase 2 (detección de facturas)")}
                    >
                        <Camera size={18} />
                        <span className="hidden sm:inline">Escanear</span>
                    </Button>
                    <Button
                        className="flex-1 md:flex-none"
                        onClick={() => setIsShoppingListModalOpen(true)}
                    >
                        <Plus size={18} />
                        Nueva Lista
                    </Button>
                </div>
            </div>

            {/* AI Nudge - Presupuesto plaza */}
            <Card variant="nudge" className="mb-8 border-l-4 border-l-amber-500">
                <div className="flex gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl h-fit">
                        <TrendingDown className="text-amber-600" size={24} />
                    </div>
                    <div>
                        <h3 className="text-amber-900 dark:text-amber-200 font-semibold mb-1">
                            ¿Vas a la plaza de mercado?
                        </h3>
                        <p className="text-amber-800/80 dark:text-amber-200/70 text-sm mb-3">
                            Puedes establecer un presupuesto cerrado para compras en efectivo. La IA te ayudará a cuadrar los productos según precios históricos.
                        </p>
                        <Button
                            variant="ghost"
                            className="text-amber-700 dark:text-amber-300 p-0 h-auto font-bold hover:bg-transparent"
                            onClick={() => alert("💰 Presupuesto Plaza: Funcionalidad en desarrollo para establecer límites de gasto en compras en efectivo")}
                        >
                            Establecer presupuesto <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Lists & Favs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex border-b border-border-color">
                        <button
                            onClick={() => setActiveTab("listas")}
                            className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${activeTab === "listas" ? "text-color-primary" : "text-text-secondary"}`}
                        >
                            Mis Listas
                            {activeTab === "listas" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-color-primary"></div>}
                        </button>
                        <button
                            onClick={() => setActiveTab("analisis")}
                            className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${activeTab === "analisis" ? "text-color-primary" : "text-text-secondary"}`}
                        >
                            Análisis de Precios
                            {activeTab === "analisis" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-color-primary"></div>}
                        </button>
                    </div>

                    {activeTab === "listas" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card className="flex items-center gap-4 cursor-pointer hover:border-color-primary active:scale-95 transition-all">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                                    <Star className="text-blue-600" size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm">Mercado Quincenal</h4>
                                    <p className="text-xs text-text-secondary">Favorita · 24 productos</p>
                                </div>
                            </Card>
                            <Card className="flex items-center gap-4 cursor-pointer hover:border-color-primary active:scale-95 transition-all">
                                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl">
                                    <History className="text-emerald-600" size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm">Última compra</h4>
                                    <p className="text-xs text-text-secondary">Hace 4 días · $185,000</p>
                                </div>
                            </Card>
                        </div>
                    ) : (
                        <Card className="p-8 text-center border-dashed">
                            <Store className="mx-auto mb-4 text-text-secondary opacity-30" size={48} />
                            <p className="text-sm text-text-secondary">
                                Marca tus tiendas favoritas para que el **AI Scrapper** pueda comparar precios y sugerirte dónde comprar hoy.
                            </p>
                            <Button
                                variant="secondary"
                                className="mt-4"
                                onClick={() => alert("🏪 Configurar Tiendas: Marca tus tiendas favoritas para que el AI Scrapper compare precios (Phase 2)")}
                            >
                                Configurar Tiendas
                            </Button>
                        </Card>
                    )}

                    {/* Empty State placeholder for actual list items */}
                    <div className="bg-surface/50 rounded-2xl border border-dashed border-border-color p-12 text-center">
                        <ShoppingBasket size={48} className="mx-auto mb-4 text-text-secondary opacity-20" />
                        <h3 className="font-heading font-semibold text-lg mb-2">No hay productos en tu lista actual</h3>
                        <p className="text-sm text-text-secondary max-w-sm mx-auto">
                            Agrega productos manualmente o **escanea una factura anterior** para que la IA prediga lo que necesitas reponer.
                        </p>
                    </div>
                </div>

                {/* Right Column: Upload & Sync */}
                <div className="space-y-6">
                    <Card className="bg-color-primary text-white overflow-hidden relative">
                        <div className="relative z-10">
                            <h3 className="font-heading font-bold text-lg mb-2 flex items-center gap-2">
                                <FileText size={20} /> Procesar Factura
                            </h3>
                            <p className="text-white/70 text-xs mb-4">
                                Sube una foto o PDF de tu factura. La IA extraerá productos, precios y comercios automáticamente.
                            </p>
                            <Button
                                className="w-full bg-white text-color-primary hover:bg-white/90"
                                onClick={() => alert("📄 Procesar Factura: Carga una foto o PDF. La IA extraerá productos y precios automáticamente (Phase 2)")}
                            >
                                Seleccionar Archivo
                            </Button>
                        </div>
                        {/* Abstract shape decoration */}
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    </Card>

                    <Card className="p-5">
                        <h4 className="font-heading font-semibold text-sm mb-4">Corte de Logística</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-text-secondary">Presupuesto Mercado</span>
                                <span className="font-bold">$450,000</span>
                            </div>
                            <div className="w-full bg-border-color h-2 rounded-full overflow-hidden">
                                <div className="bg-color-secondary h-full" style={{ width: '0%' }}></div>
                            </div>
                            <p className="text-[10px] text-text-secondary leading-relaxed">
                                El total de esta operación se cargará automáticamente a tus **Gastos Recurrentes** al finalizar el proceso.
                            </p>
                            <div className="pt-2 border-t border-border-color mt-4 flex items-center justify-between">
                                <span className="text-xs font-semibold">Ciclo: Quincenal</span>
                                <Button
                                    variant="ghost"
                                    className="h-auto p-0 text-[10px] underline"
                                    onClick={() => alert("📅 Cambiar Ciclo: Puedes cambiar entre ciclos semanales, quincenales y mensuales")}
                                >
                                    Cambiar
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}
