import Register from "./component/Register"
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import VerifyOtp from "./component/VerifyOtp"

const App = () => {
  return (
    <>
      <Router>
      <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/verify' element={<VerifyOtp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App