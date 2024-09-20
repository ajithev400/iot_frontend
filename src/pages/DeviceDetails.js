// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for handling redirects
// import '../assets/styles/css/style.css';

// const DeviceDetails = () => {
//     const { deviceId } = useParams();
//     const [device, setDevice] = useState(null);
//     const navigate = useNavigate(); // For navigating after delete or update

//     useEffect(() => {
//         fetch(`http://127.0.0.1:8000/api/devices/${deviceId}/`)
//             .then(response => response.json())
//             .then(data => setDevice(data))
//             .catch(error => console.error('Error fetching device details:', error));
//     }, [deviceId]);

//     const handleDelete = () => {
//         fetch(`http://127.0.0.1:8000/api/devices/${deviceId}/`, {
//             method: 'DELETE',
//         })
//         .then(() => {
//             console.log('Device deleted successfully');
//             navigate('/'); // Redirect to homepage after deletion
//         })
//         .catch(error => console.error('Error deleting device:', error));
//     };

//     const handleUpdate = () => {
//         // Redirect to an update form (You will need to create this route)
//         navigate(`/device/${deviceId}/edit`);
//     };

//     if (!device) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="device-details-section">
//             <section className="coffee_section layout_padding">
//                 <div className="container">
//                     <div className="row">
//                         <h1 className="coffee_taital">Device Details</h1>
//                     </div>
//                 </div>
//                 <div className="container device-details-content">
//                     <div className="device-details-box">
//                         <h3 className="types_text">{device.name}</h3>
//                         <p className="looking_text">
//                             <strong>Device ID:</strong> {device.device_id}<br />
//                             <strong>Status:</strong> {device.status}<br />
//                             <strong>Location:</strong> {device.location}<br />
//                             <strong>Threshold:</strong> {device.configuration.threshold} {device.configuration.unit}
//                         </p>
//                         <p className="created_text">
//                             <strong>Created At:</strong> {new Date(device.created_at).toLocaleString()}
//                         </p>
//                         {/* Buttons for Update and Delete */}
//                         <div className="action-buttons">
//                             <button className="update-btn" onClick={handleUpdate}>Update</button>
//                             <button className="update-btn" onClick={handleUpdate}>Deactivate</button>
//                             <button className="delete-btn" onClick={handleDelete}>Delete</button>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default DeviceDetails;


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for handling redirects
import '../assets/styles/css/style.css';

const DeviceDetails = () => {
    const { deviceId } = useParams();
    const [device, setDevice] = useState(null);
    const navigate = useNavigate(); // For navigating after delete or update

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/devices/${deviceId}/`)
            .then(response => response.json())
            .then(data => setDevice(data))
            .catch(error => console.error('Error fetching device details:', error));
    }, [deviceId]);

    const handleDelete = () => {
        fetch(`http://127.0.0.1:8000/api/devices/${deviceId}/`, {
            method: 'DELETE',
        })
        .then(() => {
            console.log('Device deleted successfully');
            navigate('/'); // Redirect to homepage after deletion
        })
        .catch(error => console.error('Error deleting device:', error));
    };

    const handleUpdate = () => {
        // Redirect to an update form (You will need to create this route)
        navigate(`/device/${deviceId}/edit`);
    };

    const handleDeactivate = () => {
        const action = device.status === 'online' ? 'deactivate' : 'activate';
        fetch(`http://127.0.0.1:8000/api/devices/${deviceId}/${action}/`, {
            method: 'POST', // Adjust if your API requires a different method
        })
        .then(() => {
            console.log(`Device ${action}d successfully`);
            // Update the device status locally without refetching
            setDevice(prevDevice => ({
                ...prevDevice,
                status: device.status === 'online' ? 'offline' : 'online',
            }));
        })
        .catch(error => console.error(`Error ${action}ing device:`, error));
    };

    if (!device) {
        return <div>Loading...</div>;
    }

    return (
        <div className="device-details-section">
            <section className="coffee_section layout_padding">
                <div className="container">
                    <div className="row">
                        <h1 className="coffee_taital">Device Details</h1>
                    </div>
                </div>
                <div className="container device-details-content">
                    <div className="device-details-box">
                        <h3 className="types_text">{device.name}</h3>
                        <p className="looking_text">
                            <strong>Device ID:</strong> {device.device_id}<br />
                            <strong>Status:</strong> {device.status}<br />
                            <strong>Location:</strong> {device.location}<br />
                            <strong>Threshold:</strong> {device.configuration.threshold} {device.configuration.unit}
                        </p>
                        <p className="created_text">
                            <strong>Created At:</strong> {new Date(device.created_at).toLocaleString()}
                        </p>
                        {/* Buttons for Update and Delete */}
                        <div className="action-buttons">
                            <button className="update-btn" onClick={handleUpdate}>Update</button>
                            <button className="deactivate-btn" onClick={handleDeactivate}>
                                {device.status === 'online' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button className="delete-btn" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DeviceDetails;
