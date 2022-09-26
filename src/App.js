import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import CreateReport from './views/CreateReport';
import ListReport from './views/ListReport';
import Footer from './shared/Footer';
import Header from './shared/Header';



function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/new-report' element={<CreateReport></CreateReport>}></Route>
          <Route path='/lists-report' element={<ListReport></ListReport>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
