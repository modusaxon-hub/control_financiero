import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-dvh flex flex-col" style={{ background: "var(--bg)" }}>
            <AppHeader />

            <div className="flex flex-1">
                <Sidebar />

                <main
                    className="flex-1 w-full"
                    style={{
                        paddingBottom: "calc(var(--bottom-nav-height) + var(--space-4))",
                        paddingLeft: 0,
                    }}
                >
                    {/* On desktop, offset for sidebar */}
                    <div className="lg:ml-[240px]">
                        <div className="app-container" style={{ paddingTop: "var(--space-6)" }}>
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            <BottomNav />
        </div>
    );
}
