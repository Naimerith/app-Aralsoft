import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './shared/Home';
import CreateReport from './views/CreateReport';
import ListReport from './views/ListReport';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/new-report' element={<CreateReport></CreateReport>}></Route>
          <Route path='/list-report' element={<ListReport></ListReport>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
