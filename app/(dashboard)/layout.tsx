import Sidebar from "@/modules/dashboard/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-bg-main">
            <Sidebar />
            <main className="flex-1 overflow-auto pt-14 md:pt-0">
                <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}