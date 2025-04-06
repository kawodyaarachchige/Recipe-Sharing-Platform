import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { store } from './redux/store';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from 'sonner';
import Home from "./pages/Home.tsx";
import Header from "./components/layout/Header.tsx";


const AppContent = () => {
    return (
        <Router>
            <div>
            <Toaster position="top-right" richColors />
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </main>
            </div>
        </Router>
    );
};

export function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}