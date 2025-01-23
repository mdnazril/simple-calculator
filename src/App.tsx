import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Provider from './context/Provider';
import Layout from './layout'
import AppRoutes from './Routes';

interface Props {
}

function App(Props: Props) {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <Provider>
                <Layout>
                    <AppRoutes />
                </Layout>
            </Provider>
        </ThemeProvider >
    )
}

export default App
