import AppFooter from "@/components/layout/AppFooter";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="min-h-dvh flex flex-col"
            style={{ background: "var(--bg)" }}
        >
            {/* Auth pages: sin header ni bottom nav, solo footer */}
            <main className="flex flex-1 items-center justify-center px-6 py-10">
                {children}
            </main>
            <AppFooter />
        </div>
    );
}
