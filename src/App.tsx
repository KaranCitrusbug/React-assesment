import Routes from './routes/routes';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
   <Provider store={store}>
    <Routes/>
    <ToastContainer position='bottom-right'/>         
   </Provider>
  );
}

export default App;
