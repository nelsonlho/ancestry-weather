import './App.css';
import CurrentTime from '@/components/CurrentTime';
import Main from '@/components/Main';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ModeToggle } from './components/ModeToggle';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <div className="flex flex-col">
        <CurrentTime />
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
