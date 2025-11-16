import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if(username === "admin" && password === "admin") {
      login("token_123");
      navigate("/products");
    } else {
      setErrorMsg("Username atau Password salah!"); 
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleLogin} className="bg-white shadow-lg w-sm p-4 rounded-md dark:bg-slate-800">
        <h1 className="mb-5 text-center text-2xl font-bold">Login</h1>
        <div className="mb-4 flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMsg && <p>{errorMsg}</p>}
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  );
}
