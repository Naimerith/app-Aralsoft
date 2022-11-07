import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import CreateReport from './views/CreateReport';
import ListReport from './views/ListReport';
import ReportGenerated from './views/ReportGenerated';
import Footer from './shared/Footer';
import Header from './shared/Header';


function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <Footer />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/new-report' element={<CreateReport />}></Route>
          <Route path='/lists-report' element={<ListReport />}></Route>
          <Route path='/report-generated' element={<ReportGenerated />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
