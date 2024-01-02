import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePassword, setChangePassword] = useState(false);
  const token = localStorage.getItem('token');

const handleUpdatePassword = async (e) => {
        
  e.preventDefault();

    if(!password || !newPassword){
      toast.error("Please fill all the fields");
      return;
    }

    if(newPassword.length<8){
      toast.error("Password length should be greater than or equal to 8");
      return;
    }

    if(newPassword.length>12){
      toast.error("Password length should be less than or equal to 12");
      return;
    }


    try{
        const body={password, newPassword}
        const res = await axios.patch("/update-password/", body, {// TODO
            'Authorization': `Token ${token}`,
        });

        if(res.data.success===false){
            toast.error(res.data.message);
            return;
        }

        toast.success("Password changed successfully");
        setNewPassword("");
        setPassword("");
        setChangePassword(false);
        } catch(error){
            console.log(error);
            toast.error(`Something went wrong ${error}`)
        }
    }


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        });

        const user = response.data.user_info;
        console.log('User:', user);
        setUserInfo(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {userInfo && 
      <form className="border p-4 rounded bg-light " style={{minWidth: "40%"}}>
        <h2 className="mb-4 text-center ">User Profile</h2>

        <div className="form-group">
          <label className='mb-1'>Username</label>
          <input type="text" className="form-control" value={userInfo.username} readOnly />
        </div>

        <div className="form-group">
          <label className='mb-1'>Email</label>
          <input type="email" className="form-control" value={userInfo.email} readOnly />
        </div>

        {!changePassword ? (
            <button className='fs-6 text-end btn mb-2 text-info-emphasis ' onClick={() => setChangePassword(true)}>
                Want to change password ?
            </button>
        ) : (
            <>
                <div className="form-group">
                    <label className='mb-1'>Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        required
                        placeholder="Enter current password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className='mb-1'>New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        required
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <button type="button" className="btn btn-primary" onClick={handleUpdatePassword}>
                    Update Password
                </button>
            </>
        )}
      </form>}
    </div>
  );
};

export default UserProfile;
