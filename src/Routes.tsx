import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home'

type Props = {}

const AppRoutes = (props: Props) => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element="404" path="*" />
            </Routes>
        </Router>
    )
}

export default AppRoutes