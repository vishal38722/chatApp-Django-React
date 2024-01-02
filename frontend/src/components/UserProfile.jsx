import React, { Component } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      password: '',
      newPassword: '',
      changePassword: false,
    };

    this.token = localStorage.getItem('token');
  }

  handleUpdatePassword = async (e) => {
    e.preventDefault();

    const { password, newPassword } = this.state;

    if (!password || !newPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password length should be greater than or equal to 8");
      return;
    }

    if (newPassword.length > 12) {
      toast.error("Password length should be less than or equal to 12");
      return;
    }

    try {
      const body = { password, newPassword };
      const res = await axios.patch("/update-password/", body, {
        headers: {
          'Authorization': `Token ${this.token}`,
        },
      });

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Password changed successfully");
      this.setState({ newPassword: '', password: '', changePassword: false });
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong ${error}`);
    }
  };

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      const response = await axios.get('/user/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.token}`
        }
      });

      const user = response.data.user_info;
      console.log('User:', user);
      this.setState({ userInfo: user });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  render() {
    const { userInfo, changePassword, password, newPassword } = this.state;

    return (
      <div className="container d-flex flex-column  justify-content-center align-items-center vh-100">
        {userInfo && 
        <div className="border p-4 rounded bg-light " style={{minWidth: "40%"}}>
          <h2 className="mb-4 text-center ">User Profile</h2>

          <div className="form-group">
            <label className='mb-1'>Username</label>
            <input type="text" className="form-control" value={userInfo.username} readOnly disabled  />
          </div>

          <div className="form-group">
            <label className='mb-1'>Email</label>
            <input type="email" className="form-control" value={userInfo.email} readOnly disabled  />
          </div>

          {!changePassword && 
            <button className='fs-6 btn mb-2 text-info-emphasis ' onClick={() => this.setState({ changePassword: true })}>
              Want to change password ?
            </button>}
        </div>}
        {changePassword && 
          <form className="border p-4 rounded bg-dark-subtle  mt-4" style={{minWidth: "40%"}}>
            <h2 className="mb-4 text-center ">Change Password</h2>
            <div className="form-group">
              <label className='mb-1'>Current Password</label>
              <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Enter current password"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
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
                  onChange={(e) => this.setState({ newPassword: e.target.value })}
              />
            </div>

            <button type="button" className="btn btn-primary" onClick={this.handleUpdatePassword}>
              Update Password
            </button>
          </form>
        }
      </div>
    );
  }
}

export default UserProfile;
