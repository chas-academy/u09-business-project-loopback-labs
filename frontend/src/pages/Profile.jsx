import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

function Profile() {
  useAuth();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <div className="profile-info">
          <div className="profile-image">
            <img 
              src="https://github.com/identicons/jhelgodt.png" 
              alt="Profile"
              className="profile-avatar"
            />
          </div>
          <div className="profile-details">
            <h2>Joakim Helgodt</h2>
            <p>GitHub User</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h3>My Recipes</h3>
          <div className="recipe-list">
            <p>No recipes saved yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
