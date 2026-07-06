import Sidebar from "../../Sidebar/Sidebar";
import "./AppShell.css";

function AppShell({ children }) {
    return (
        <div className="app-shell">
            <Sidebar />
            <main className="app-content">
                {children}
            </main>
        </div>
    );
}

export default AppShell;