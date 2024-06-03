// import logo from './logo.svg';
import './App.css';
import Router from './Router';
import { Provider } from 'react-redux';
import ConfigureStores from './Redux/ConfigureStore'
import { useRef } from "react";
function App() {

 
  const windowSize = useRef(
    window.innerWidth,
  );
 
  if(windowSize?.current >= 900)
    {
    localStorage.setItem("key", "desktop")
    }
    else{
      localStorage.setItem("key", "mobile")
    }
 

  return (
    <Provider store={ConfigureStores}>
      <Router />
    </Provider>
  );
}

export default App;
