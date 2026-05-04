import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Thermometer, Droplets, CloudRain, Wind, Play, FileJson, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Input() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('manual'); // 'manual' or 'sample'
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    temp: '',
    humidity: '',
    rainfall: '',
    wind: ''
  });

  const handleInputChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'sample') {
      setFormData({
        temp: '26.8',
        humidity: '72.5',
        rainfall: '145.2',
        wind: '18.4'
      });
    } else {
      setFormData({ temp: '', humidity: '', rainfall: '', wind: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API processing for 2.5 seconds
    setTimeout(() => {
      setIsLoading(false);
      navigate('/output');
    }, 2500);
  };

  const inputs = [
    { id: 'temp', label: 'Temperature (°C)', icon: Thermometer, placeholder: 'e.g. 24.5' },
    { id: 'humidity', label: 'Humidity (%)', icon: Droplets, placeholder: 'e.g. 60' },
    { id: 'rainfall', label: 'Rainfall (mm)', icon: CloudRain, placeholder: 'e.g. 120' },
    { id: 'wind', label: 'Wind Speed (km/h)', icon: Wind, placeholder: 'e.g. 15' },
  ];

  const dummyTableData = [
    { id: 1, date: '2025-05-01', temp: 26.8, hum: 72.5, rain: 145.2, wind: 18.4 },
    { id: 2, date: '2025-05-02', temp: 27.1, hum: 70.0, rain: 110.5, wind: 15.2 },
    { id: 3, date: '2025-05-03', temp: 25.5, hum: 75.2, rain: 205.1, wind: 22.0 },
    { id: 4, date: '2025-05-04', temp: 28.3, hum: 68.4, rain: 80.0, wind: 12.5 },
    { id: 5, date: '2025-05-05', temp: 29.0, hum: 65.1, rain: 45.3, wind: 10.1 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">Model Parameters</h2>
        <p className="text-gray-400">Configure inputs for the Perfumer Optimization Algorithm.</p>
      </motion.div>

      {/* Toggle Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-10"
      >
        <div className="bg-black/30 p-1 rounded-xl border border-white/10 flex items-center shadow-inner">
          <button
            onClick={() => handleModeChange('manual')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'manual' 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Manual Input
          </button>
          <button
            onClick={() => handleModeChange('sample')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              mode === 'sample' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileJson className="w-4 h-4" />
            Use Sample Dataset
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">1</span>
            {mode === 'manual' ? 'Enter Parameters' : 'Auto-filled Parameters'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            {inputs.map((input) => (
              <div key={input.id}>
                <label htmlFor={input.id} className="block text-sm font-medium text-gray-300 mb-2">
                  {input.label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <input.icon className={`h-5 w-5 ${mode === 'sample' ? 'text-purple-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    id={input.id}
                    value={formData[input.id]}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      mode === 'sample' ? 'border-purple-500/50 bg-purple-500/5 cursor-not-allowed' : 'border-white/10 focus:ring-indigo-500 hover:border-white/20'
                    }`}
                    placeholder={input.placeholder}
                    readOnly={mode === 'sample'}
                    required
                  />
                </div>
              </div>
            ))}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-6 text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all group ${
                isLoading ? 'bg-indigo-600/70 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing POA + GA...
                </>
              ) : (
                <>
                  Run Optimization
                  <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-8"
        >
          {mode === 'manual' ? (
            <div className="glass-panel p-8 flex flex-col justify-center items-center h-full border-dashed border-2 border-white/10">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                 <FileJson className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">No Dataset Selected</h3>
              <p className="text-center text-sm text-gray-500 max-w-xs">
                Switch to "Use Sample Dataset" to simulate batch processing with a historical climate registry.
              </p>
            </div>
          ) : (
            <div className="glass-panel p-6 flex flex-col h-full border-purple-500/20 shadow-purple-500/10 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">2</span>
                  Dataset Preview
                </h3>
                <span className="text-xs font-medium px-2.5 py-1 bg-purple-500/10 text-purple-300 rounded-md border border-purple-500/20">
                  climate_records_v4.csv
                </span>
              </div>
              
              <div className="bg-black/40 rounded-xl overflow-hidden border border-white/5 flex-1">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 bg-white/5">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Temp</th>
                      <th className="px-4 py-3 font-medium">Hum</th>
                      <th className="px-4 py-3 font-medium">Rain</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {dummyTableData.map((row) => (
                      <tr key={row.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-2.5 text-gray-300">{row.date}</td>
                        <td className="px-4 py-2.5 text-gray-400">{row.temp}</td>
                        <td className="px-4 py-2.5 text-gray-400">{row.hum}</td>
                        <td className="px-4 py-2.5 text-gray-400">{row.rain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                <p className="text-xs text-gray-400 italic">Sample dataset generated for demonstration purposes.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
