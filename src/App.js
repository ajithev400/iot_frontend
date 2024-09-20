import DeviceDetails from "./pages/DeviceDetails";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/device/:deviceId" element={<DeviceDetails />} />  {/* Device details route */}
      </Routes>
    </Router>
  );
}

export default App;
