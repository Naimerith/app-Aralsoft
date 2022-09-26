import './App.css';
import './assets/styles/Sidebar.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import CreateReport from './views/CreateReport';
import ListReport from './views/ListReport';
import Footer from './shared/Footer';
import Sidebar from './shared/Sidebar';




function App() {
  return (
    <div className="App">
      <div className='sidebar'>
        <Sidebar />
      </div>
      <Footer />
      {/* <Home></Home> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/new-report' element={<CreateReport />}></Route>
          <Route path='/lists-report' element={<ListReport />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
