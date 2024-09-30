import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import {routes} from "@/routes/routes.tsx";

export function NavBar() {
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

    const filteredRoutes = isAuthorized
        ? routes[0].children.filter((route) => route.path !== "login")
        : [];

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {filteredRoutes.map((route, index) => (
                    <NavigationMenuItem key={index}>
                        <Link to={route.path}>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {route.path.charAt(0).toUpperCase() + route.path.slice(1)}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}