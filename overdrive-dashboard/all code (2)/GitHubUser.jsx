import React, { useState } from "react";
import "./GitHubUser.css";

function GitHubUser() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    if (!username) return;
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setUserData(null);
    }
  };

  return (
    <div className="github-user-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt="Avatar" />
          <h2>{userData.name || userData.login}</h2>
          <p>@{userData.login}</p>
          <p>{userData.bio}</p>

          <div className="details">
            {userData.company && <p>🏢 {userData.company}</p>}
            {userData.location && <p>📍 {userData.location}</p>}
            {userData.blog && (
              <p>
                🔗 <a href={userData.blog}>{userData.blog}</a>
              </p>
            )}
            <p>👥 {userData.followers} followers • {userData.following} following</p>
            <p>📁 {userData.public_repos} public repos</p>
            <p>🕓 Joined {new Date(userData.created_at).toLocaleDateString()}</p>
            <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
            >
            View Profile
            </a>

          </div>
        </div>
      )}
    </div>
  );
}

export default GitHubUser;
