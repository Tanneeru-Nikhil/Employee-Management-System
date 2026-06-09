import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import AddEmployee from './components/AddEmployee'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <>
    <BrowserRouter>
        <NavBar />

          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employee" element={<ListEmployeeComponent />} />
            <Route path="/add-Employee" element={<AddEmployee />} />
            <Route path="/edit-Employee/:id" element={<AddEmployee />} />
          </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
