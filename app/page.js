"use client";
import { useState, useEffect } from "react";
import { account, ID } from "./appwrite";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user);
      } catch (error) {
        console.log("No active session found", error);
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async () => {
    await account.create(ID.unique(), email, password, name);
    login(email, password);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  return (
    <div className="flex h-full mt-60 items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login or Register</CardTitle>
          <CardDescription>Access your account or create a new one.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
          </form>
        </CardContent>
        <CardFooter className="w-full flex justify-between ">
          <div  className="w-full flex mx-auto">
          <Button
            variant="outline"
            onClick={() => login(email, password)}
          >
            Login
          </Button>
          <Button variant="outline"
            onClick={register}
          >
            Register
          </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
