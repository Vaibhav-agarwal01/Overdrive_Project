import { useEffect, useState } from "react";
import './CodeforcesUser.css';

function CodeforcesUser() {
  const [userInfo, setUserInfo] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [username, setUsername] = useState("tourist");
  const [searchUser, setSearchUser] = useState("tourist");

  const fetchData = async () => {
    try {
      const [infoRes, subRes] = await Promise.all([
        fetch(`https://codeforces.com/api/user.info?handles=${searchUser}`),
        fetch(`https://codeforces.com/api/user.status?handle=${searchUser}&from=1&count=5`),
      ]);

      const infoData = await infoRes.json();
      const subData = await subRes.json();

      if (infoData.status === "OK") {
        setUserInfo(infoData.result[0]);
      }
      if (subData.status === "OK") {
        setSubmissions(subData.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchUser]);

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }

  return (
    <div className="cf-user-container">
      <h2>Codeforces User Info</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Codeforces handle"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => setSearchUser(username)}>Search</button>
      </div>

      {userInfo && (
        <div className="cf-user-card">
          <p><strong>Handle:</strong> {userInfo.handle}</p>
          <p><strong>Name:</strong> {userInfo.firstName || ""} {userInfo.lastName || ""}</p>
          <p><strong>Country:</strong> {userInfo.country || "N/A"}</p>
          <p><strong>City:</strong> {userInfo.city || "N/A"}</p>
          <p><strong>Organization:</strong> {userInfo.organization || "N/A"}</p>
          <p><strong>Contribution:</strong> {userInfo.contribution}</p>
          <p><strong>Friend of Count:</strong> {userInfo.friendOfCount}</p>
          <p><strong>Rating:</strong> {userInfo.rating}</p>
          <p><strong>Rank:</strong> {userInfo.rank}</p>
          <p><strong>Max Rating:</strong> {userInfo.maxRating}</p>
          <p><strong>Max Rank:</strong> {userInfo.maxRank}</p>
          <p><strong>Registered:</strong> {formatTime(userInfo.registrationTimeSeconds)}</p>
          <p><strong>Last Online:</strong> {formatTime(userInfo.lastOnlineTimeSeconds)}</p>
          <a
            href={`https://codeforces.com/profile/${userInfo.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cf-profile-button"
          >
            View Profile
          </a>
        </div>
      )}

      {submissions.length > 0 && (
        <div className="cf-submissions">
          <h3>Last 5 Submissions</h3>
          <ul>
            {submissions.map((sub, idx) => (
              <li key={idx} className="cf-submission">
                <p><strong>Problem:</strong> {sub.problem.name}</p>
                <p><strong>Verdict:</strong> {sub.verdict || "Pending"}</p>
                <p><strong>Language:</strong> {sub.programmingLanguage}</p>
                <p><strong>Time:</strong> {formatTime(sub.creationTimeSeconds)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CodeforcesUser;
