import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Package, Boxes } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "../shared/ThemeToggle";

const sidebarItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Produtos",
    to: "/products",
    icon: Package,
  },
  {
    title: "Estoque",
    to: "/stock",
    icon: Boxes,
  },
];

export default function DashboardLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  const currentTitle =
    sidebarItems.find((item) => item.to === location.pathname)?.title ??
    "Dashboard";

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="px-4 text-2xl p-4 font-semibold">StockStock</h2>
        </SidebarHeader>

        <SidebarContent>
          <nav className="flex flex-col gap-1 px-2">
            {sidebarItems.map(({ title, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-lg transition-colors
                  ${isActive ? "bg-muted font-medium" : "hover:bg-muted"}`
                }
              >
                <Icon className="h-4 w-4" />
                {title}
              </NavLink>
            ))}
          </nav>
        </SidebarContent>

        <SidebarFooter className="px-4 flex flex-col gap-2 text-sm text-muted-foreground">
          <span>v1.0.0</span>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4 justify-between">
          <h1 className="text-lg font-semibold">{currentTitle}</h1>
          <ThemeToggle />
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
