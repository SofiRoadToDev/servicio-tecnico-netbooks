import SideBar from '../Components/SideBar';

export default function AppLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <main className="flex-1 p-6 ml-64 bg-gray-100">
                {children}
            </main>
        </div>
    );
}
