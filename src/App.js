import logo from './logo.svg';
import './App.css';
import RegisterComponent from './component/register';
import LoginComponent from './component/login';
import LatihanComponent from './component/Test1';

function Header(name) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      React Lesson : {name}
      <input />
    </header>
  )
}

function App() {
  return (
    <LoginComponent/>
  );
}

export default App;
