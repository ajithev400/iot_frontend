// import '../assets/styles/css/style1.css'
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'; 

// // Function to dynamically import all images from a folder
// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// // Import all images from assets/images
// const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

// const HomePage = () => {
//     const [devices, setDevices] = useState([]);

//     // Fetch devices from the API on page load
//     useEffect(() => {
//         fetch('http://127.0.0.1:8000/api/devices/')
//             .then(response => response.json())
//             .then(data => setDevices(data))
//             .catch(error => console.error('Error fetching devices:', error));
//     }, []);

//     return (
//         <div>
//             <section className="coffee_section layout_padding">
//                 <div className="container">
//                     <div className="row">
//                         <h1 className="coffee_taital">Devices</h1>
                        
//                     </div>
//                 </div>
//                 <div className="device_section_2">
//                     <div id="main_slider" className="carousel slide" data-ride="carousel">
//                         <div className="carousel-inner">
//                             <div className="carousel-item active">
//                                 <div className="container-fluid">
//                                     <div className="row">                                        
//                                         {devices.map((device, index) => (
//                                             <div className="col-lg-3 col-md-6" key={index}>
//                                                 <div className="device_img">
//                                                     <img src={images['img-1.png']} alt={`Device ${device.name}`} />
//                                                 </div>
//                                                 <h3 className="types_text">{device.name}</h3>
//                                                 <p className="looking_text">
//                                                     <strong>Status:</strong> {device.status}<br />
//                                                     <strong>Location:</strong> {device.location}<br />
//                                                     <strong>Threshold:</strong> {device.configuration.threshold} {device.configuration.unit}
//                                                 </p>
//                                                 <p className="created_text">
//                                                     <strong>Created At:</strong> {new Date(device.created_at).toLocaleString()}
//                                                 </p>
//                                                 <div className="read_bt">
//                                                 <Link to={`/device/${device.id}`}>Details</Link>
//                                                 </div>
//                                             </div>
//                                         ))}

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default HomePage;



import '../assets/styles/css/style1.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

// Function to dynamically import all images from a folder
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

// Import all images from assets/images
const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

const HomePage = () => {
    const [devices, setDevices] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to toggle the form
    const [newDevice, setNewDevice] = useState({
        name: '',
        device_id: '',
        status: '',
        location: '',
        configuration: {
            threshold: 20,
            unit: 'Celsius',
        }
    });

    // Fetch devices from the API on page load
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/devices/')
            .then(response => response.json())
            .then(data => setDevices(data))
            .catch(error => console.error('Error fetching devices:', error));
    }, []);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDevice(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle configuration change (threshold)
    const handleConfigChange = (e) => {
        const { name, value } = e.target;
        setNewDevice(prevState => ({
            ...prevState,
            configuration: {
                ...prevState.configuration,
                [name]: name === 'threshold' ? Number(value) : value // Convert threshold to number
            }
        }));
    };
    // Submit form data to the API
    const handleFormSubmit = (e) => {
        e.preventDefault();

        
        fetch('http://127.0.0.1:8000/api/devices/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDevice)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    console.error('Error response:', err);
                    throw new Error('Error adding device: ' + err.errors || 'Unknown error');
                });
            }
            return response.json();
        })
        .then(data => {
            setDevices(prevDevices => [...prevDevices, data]);
            setShowForm(false);
        })
        .catch(error => console.error('Error adding device:', error));
    };

    return (
        <div>
            <section className="coffee_section layout_padding">
                <div className="container">
                    <div className="row">
                        <h1 className="coffee_taital">Devices</h1>
                        <button className="add-device-btn" onClick={() => setShowForm(true)}>Add New Device</button>
                    </div>
                </div>

                {/* Device List */}
                <div className="device_section_2">
                    <div id="main_slider" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container-fluid">
                                    <div className="row">                                        
                                        {devices.map((device, index) => (
                                            <div className="col-lg-3 col-md-6" key={index}>
                                                <div className="device_img">
                                                    <img src={images['img-1.png']} alt={`Device ${device.name}`} />
                                                </div>
                                                <h3 className="types_text">{device.name}</h3>
                                                <p className="looking_text">
                                                    <strong>Status:</strong> {device.status}<br />
                                                    <strong>Location:</strong> {device.location}<br />
                                                    <strong>Threshold:</strong> {device.configuration.threshold} {device.configuration.unit}
                                                </p>
                                                <p className="created_text">
                                                    <strong>Created At:</strong> {new Date(device.created_at).toLocaleString()}
                                                </p>
                                                <div className="read_bt">
                                                    <Link to={`/device/${device.id}`}>Details</Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for Adding New Device */}
                {showForm && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-btn" onClick={() => setShowForm(false)}>&times;</span>
                            <h2>Add New Device</h2>
                            <form onSubmit={handleFormSubmit}>
                                <label>
                                    Device Name:
                                    <input type="text" name="name" value={newDevice.name} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Device ID:
                                    <input type="text" name="device_id" value={newDevice.device_id} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Status:
                                    <input type="text" name="status" value={newDevice.status} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Location:
                                    <input type="text" name="location" value={newDevice.location} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Threshold:
                                    <input type="number" name="threshold" value={newDevice.configuration.threshold} onChange={handleConfigChange} required />
                                </label>
                                <label>
                                    Unit:
                                    <select name="unit" value={newDevice.configuration.unit} onChange={handleConfigChange}>
                                        <option value="Celsius">Celsius</option>
                                        <option value="Fahrenheit">Fahrenheit</option>
                                    </select>
                                </label>
                                <button type="submit" className="submit-btn">Add Device</button>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;
