import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { BoardContainer } from './components/board-container/board-container.component';
import Home from './components/home/home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/room" component={BoardContainer} />
        <Route path="/" component={Home} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
