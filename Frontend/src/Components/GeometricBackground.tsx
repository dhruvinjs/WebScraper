import type { Theme } from '../hooks/useTheme';

interface GeometricBackgroundProps {
  theme: Theme;
}

export function GeometricBackground({ theme }:GeometricBackgroundProps) {
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100'
      }`}></div>
      
      {/* Geometric shapes */}
      <div className="absolute inset-0">
        {/* Animated floating circles */}
        <div className={`absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl animate-pulse ${
          isDark ? 'opacity-20' : 'opacity-10'
        }`}></div>
        <div className={`absolute top-40 left-32 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl 
        animate-bounce delay-300 ${
          isDark ? 'opacity-15' : 'opacity-8'
        }`}></div>
        
        <div className={`absolute top-32 left-16 w-24 h-24 bg-orange-500 rounded-lg transform rotate-12 animate-spin ${
          isDark ? 'opacity-30' : 'opacity-20'
        }`} style={{ animationDuration: '20s' }}>
          <div className={`w-full h-full flex items-center justify-center font-bold text-2xl ${
            isDark ? 'text-white' : 'text-orange-800'
          }`}>LC</div>
        </div>
        
        {/* Codeforces Logo as Geometric Element */}
        <div className={`absolute bottom-32 right-24 w-28 h-28 bg-blue-600 rounded-full transform -rotate-12 animate-pulse ${
          isDark ? 'opacity-25' : 'opacity-15'
        }`}>
          <div className={`w-full h-full flex items-center justify-center font-bold text-xl ${
            isDark ? 'text-white' : 'text-blue-800'
          }`}>CF</div>
        </div>
        
        {/* Floating code symbols */}
        <div className={`absolute top-1/4 right-1/3 w-16 h-16 bg-green-400 rounded-lg transform rotate-45 animate-bounce ${
          isDark ? 'opacity-20' : 'opacity-15'
        }`} style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <div className={`w-full h-full flex items-center justify-center font-mono text-sm ${
            isDark ? 'text-white' : 'text-green-800'
          }`}>{'{}'}</div>
        </div>
        
        <div className={`absolute bottom-1/4 left-1/3 w-20 h-20 bg-yellow-400 rounded-full animate-ping ${
          isDark ? 'opacity-25' : 'opacity-15'
        }`} style={{ animationDuration: '3s' }}>
          <div className={`w-full h-full flex items-center justify-center font-mono text-lg ${
            isDark ? 'text-gray-800' : 'text-yellow-800'
          }`}>[]</div>
        </div>
        
        {/* Dynamic rectangles */}
        <div className={`absolute top-1/2 right-1/4 w-40 h-20 bg-gradient-to-r from-green-400 to-teal-500 transform rotate-12 rounded-lg animate-pulse ${
          isDark ? 'opacity-15' : 'opacity-10'
        }`}></div>
        <div className={`absolute bottom-1/3 left-1/2 w-32 h-32 bg-gradient-to-r from-red-400 to-pink-500 transform -rotate-12 rounded-lg animate-spin ${
          isDark ? 'opacity-20' : 'opacity-12'
        }`} style={{ animationDuration: '15s' }}></div>
        
        {/* Additional platform elements */}
        <div className={`absolute top-2/3 left-1/4 w-12 h-12 bg-purple-500 transform rotate-45 animate-bounce ${
          isDark ? 'opacity-30' : 'opacity-20'
        }`} style={{ animationDelay: '2s', animationDuration: '5s' }}>
          <div className={`w-full h-full flex items-center justify-center font-bold text-xs ${
            isDark ? 'text-white' : 'text-purple-800'
          }`}>HR</div>
        </div>
        
        <div className={`absolute top-1/3 right-1/4 w-14 h-14 bg-indigo-500 rounded-full animate-pulse ${
          isDark ? 'opacity-25' : 'opacity-15'
        }`} style={{ animationDelay: '1.5s' }}>
          <div className={`w-full h-full flex items-center justify-center font-bold text-xs ${
            isDark ? 'text-white' : 'text-indigo-800'
          }`}>AC</div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-3'}`}>
          <div className="grid grid-cols-20 gap-8 h-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className={`border animate-pulse ${
                isDark ? 'border-white border-opacity-30' : 'border-gray-400 border-opacity-20'
              }`} style={{ animationDelay: `${i * 0.01}s` }}></div>
            ))}
          </div>
        </div>
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-ping ${
              isDark ? 'bg-white opacity-30' : 'bg-gray-600 opacity-20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Overlay for better text readability */}
      <div className={`absolute inset-0 ${
        isDark ? 'bg-black bg-opacity-30' : 'bg-white bg-opacity-10'
      }`}></div>
    </div>
  );
};

export default GeometricBackground;