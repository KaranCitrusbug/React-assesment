import Routes from './routes/routes';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
   <>
    <Routes/>
    <ToastContainer position='bottom-right'/>         
   </>
  );
}

export default App;
