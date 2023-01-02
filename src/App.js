import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateReport from './views/CreateReport';
import ListReport from './views/ListReport';
import Footer from './shared/Footer';
import Header from './shared/Header';
import Login from './components/Login';
import GeneratedReport from './views/GeneratedReport';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <Footer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/new-report' element={<CreateReport />}></Route>
          <Route path='/lists-report' element={<ListReport />}></Route>
          <Route path='/report' element={<GeneratedReport />}></Route>

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
