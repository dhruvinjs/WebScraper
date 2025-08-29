import { useSearch } from './hooks/useSearch';
import { useTheme } from './hooks/useTheme';
import { HeroSection,Footer } from './Components';

function App() {
  const { searchResult, search } = useSearch();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <HeroSection onSearch={search} searchResult={searchResult} />
      <Footer theme={theme} />
    </div>
  );
}

export default App;