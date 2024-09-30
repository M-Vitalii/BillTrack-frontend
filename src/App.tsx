import './App.css'
import {ThemeProvider} from "@/components/theme-provider"

import {AppRouter} from "@/routes/AppRouter.tsx";
import {Provider} from "react-redux";
import store from "@/redux/store.ts";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <AppRouter/>
            </ThemeProvider>
        </Provider>
    )
}

export default App
