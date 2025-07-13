import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Layout from './layout'
import AppRoutes from './Routes';

interface Props {
}

function App(Props: Props) {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <Layout>
                <AppRoutes />
            </Layout>
        </ThemeProvider >
    )
}

export default App
