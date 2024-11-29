import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { User , Quote } from "../types";
import { loginAPI, getQuote } from "../services/dac-api";

axios.defaults.withCredentials = true;

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState<Quote>({q:"", a:""});
  const { login, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    //Fetch random quote
    async function fetchQuote(){
      const data = await getQuote();
      setQuote(data);
    }
    fetchQuote();
    //If the user is authenticated then send them to the class dashboard
    if(user){
        navigate('/class');
    }
  },[user,navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await loginAPI(username,password);
    console.log(data);
    if (data.user) {
      const user : User = data.user as User;
      login(user);
    } else {
      alert("HUH");
    }
  };


  return (
    <div className='displayFlex flexColumn alignItemsCenter container gap10 padding15'>
      <h1>Login</h1>
      <p>"{quote.q}" - {quote.a}</p>
      <form className='displayFlex flexColumn gap10' onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="container displayFlex justifyContentCenter">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
