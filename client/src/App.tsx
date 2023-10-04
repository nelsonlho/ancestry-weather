import './App.css';
import CurrentTime from '@/components/CurrentTime';
import Main from '@/components/Main';

function App() {
  return (
    <div className="flex flex-col">
      <CurrentTime />
      <Main />
    </div>
  );
}

export default App;
