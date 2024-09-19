import React, { useState } from 'react';
import './DoctorForm.css';

const SuccessDialog = ({ onClose }) => (
    <div className="dialog-overlay">
        <div className="dialog-content">
            <img src="/success.jpg" alt="Success" className="dialog-image" />
            <h2>Data Submitted Successfully!</h2>
            <p>We will contact you soon.</p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
);

const DoctorForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        specialization: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        specialization: ''
    });

    const [showDialog, setShowDialog] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
        if (!formData.specialization) newErrors.specialization = 'Specialization is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await fetch('https:5000/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData({
                    name: '',
                    phone: '',
                    specialization: ''
                });
                setErrors({});
                setShowDialog(true);
            } else {
                alert('Failed to submit form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    return (
        <center>
            <div className="form-container">
                <h1>Are you a Doctor?</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization?"
                        value={formData.specialization}
                        onChange={handleChange}
                    />
                    {errors.specialization && <p className="error">{errors.specialization}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
            {showDialog && <SuccessDialog onClose={handleDialogClose} />}
        </center>
    );
};

export default DoctorForm;
