import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Cpu, BarChart2, Zap } from 'lucide-react';
import HomePage from './pages/Home';
import InputPage from './pages/Input';
import OutputPage from './pages/Output';

function Navigation() {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/input', label: 'Run Model', icon: Zap },
    { path: '/output', label: 'Results', icon: BarChart2 },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-black/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="text-indigo-400 w-6 h-6" />
          <span className="font-bold text-lg tracking-tight">POA <span className="text-gradient">Climate</span></span>
        </div>
        <div className="flex gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-300' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen pt-24 pb-6 px-6 flex flex-col">
        <Navigation />
        <main className="flex-1 w-full max-w-7xl mx-auto relative animate-fade-in pb-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/output" element={<OutputPage />} />
          </Routes>
        </main>
        
        <footer className="w-full max-w-7xl mx-auto text-center border-t border-white/10 pt-6 mt-8">
          <p className="text-sm text-gray-500">
            Academic Project – Genetic Algorithms and Applications (GAA)
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
