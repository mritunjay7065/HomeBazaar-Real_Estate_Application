import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/UpdateProfile.css'
import Alert from '../Alert'
import AlertContext from '../context/AlertContext'
const AgentSignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", workingArea: "", charges: "", contactNumber: "" })
    // using to accessed data without passing the props down manually to each level(component hierarch)


    const context = useContext(AlertContext);
    const { alert, addAlert } = context;

    let navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();

        // making agent name lowercase

        const { name, email, password, workingArea, charges, contactNumber } = credentials;

        let areaNEW = workingArea.toLowerCase();
        const response = await fetch(
            'http://localhost:5000/api/auth/agent/signup',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, workingArea: areaNEW, charges, contactNumber }),
            }
        );
        const json = await response.json();
        console.log(json);
        // save the token and redirect
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem('userType', "agent")
            addAlert({
                type: 'success',
                msg: 'Registered Successfully'
            })
            navigate("/")
        }
        else {
            addAlert({
                type: 'danger',
                msg: json.error
            })
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <Alert />
            <div className='update-container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={onChange} aria-describedby="emailHelp"
                            id="name" name="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onChange} aria-describedby="emailHelp"
                            id="email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" onChange={onChange} aria-describedby="emailHelp"
                            id="contactNumber" name="contactNumber" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="workingArea" className="form-label">Area</label>
                        <input type="text" className="form-control" onChange={onChange} aria-describedby="emailHelp"
                            id="workingArea" name="workingArea" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="charges" className="form-label">Charges</label>
                        <input type="text" className="form-control" onChange={onChange} aria-describedby="emailHelp"
                            id="charges" name="charges" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange}
                            id="password" name="password" minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </div>
    )
}

export default AgentSignUp