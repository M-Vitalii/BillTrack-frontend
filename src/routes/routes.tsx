import {NavBarLayout} from "@/templates/NavBarLayout.tsx";
import {ProtectedRoute} from "@/routes/ProtectedRoute.tsx";

import {
    DepartmentsPage,
    EmployeesPage,
    InvoicesPage,
    LoginPage,
    ProjectsPage,
    WorkdaysPage
} from "@/pages";

export const routes = [
    {
        path: "/",
        element: <NavBarLayout/>,
        children: [
            {
                path: "employees",
                element: (
                    <ProtectedRoute>
                        <EmployeesPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "workdays",
                element: (
                    <ProtectedRoute>
                        <WorkdaysPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "invoices",
                element: (
                    <ProtectedRoute>
                        <InvoicesPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "departments",
                element: (
                    <ProtectedRoute>
                        <DepartmentsPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "projects",
                element: (
                    <ProtectedRoute>
                        <ProjectsPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "login",
                element: <LoginPage/>,
            }
        ]
    },
]