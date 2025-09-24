import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:4001/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setUser({ username });
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function Dashboard({ user }) {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:4002/account/${user.username}`)
        .then((res) => setBalance(res.data.balance));

      axios
        .get(`http://localhost:4003/transactions/${user.username}`)
        .then((res) => setTransactions(res.data));
    }
  }, [user]);

  return (
    <div>
      <h2>Welcome {user?.username}</h2>
      <h3>Balance: ${balance}</h3>
      <h3>Transactions:</h3>
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>
            {t.type} - ${t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <nav>
        <Link to="/">Login</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  );
}
