import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfileForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            toast.error('No JWT token found. Please log in.');
            return;
        }

        axios.get('http://localhost:8080/user/profile', {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            setUsername(response.data.username);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
            toast.error('Error fetching user profile');
            setLoading(false);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            toast.error('No JWT token found. Please log in.');
            return;
        }

        const updateData = {};
        if (username) updateData.username = username;
        if (password) updateData.password = password;

        axios.put('http://localhost:8080/user/update/profile', updateData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            console.log('Profile updated successfully:', response.data.username);
            toast.success('Profile updated successfully');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile');
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Update Profile</h2>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UserProfileForm;
