import React, { useEffect, useState } from 'react'
import '../css/Dashboard.css'
import Alert from '../Alert'
import { NavLink } from 'react-router-dom';
export default function Dashboard() {
    const host = "http://localhost:5000";
    //useState hook to maintain the user state
    const [userDetails, setuserDetails] = useState({ name: "", email: "" })
    // /This is function to fect user details
    const getUserDetails = async (e) => {
         //API call to fetch user data
        const response = await fetch(`${host}/api/auth/buyer/getUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

        });
        const json = await response.json();
        if (json.success) {
            setuserDetails({ name: json.user.name, email: json.user.email })
        }
        else {
            alert("Your credentails is not valid. please try to login again!")
        }

    }
    // /Runs only on the first render page to get user data
    useEffect(() => {
        getUserDetails();
        
    }, [])

    function capitalize(name) {
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
      }
    return (
        <>
         <Alert />
            <div className='dashboard-top bg-primary text-white'>Dashboard </div>
            <NavLink to="/buyer/chat" className="chat"><i className="chat-icon fab fa-rocketchat" ></i></NavLink>
            <div className='dashboard'>
                <div className="row">
                    <div className="col-sm-5">
                        <div className='profile'>
                            <div className='profile-data'><span>Name: </span>{capitalize(userDetails.name.toLowerCase())}</div>
                            <div className='profile-data'><span>Email Id: </span>{userDetails.email.toLowerCase()}</div>
                        </div>
                        <div className="update">
                            <div >
                                <NavLink to="/buyer/update-profile" state={{userDetails}} className="" ><button type="button" className="btn btn-outline-primary update-btn">Update Profile</button></NavLink>
                            </div>
                            <div >
                                <NavLink to="/buyer/update-password" className="" ><button type="button" className="btn btn-outline-primary update-btn">Update Password</button></NavLink>
                            </div>

                        </div>
                    </div>
                    <div className="col-sm-7">

                    </div>
                </div>
            </div>



        </>

    )
}
