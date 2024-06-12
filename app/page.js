"use client";
import { useState, useEffect } from "react";
import { account, ID } from "./appwrite";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Script from 'next/script';

const trackingId = "G-DJNXR1J63Y";

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true); // State to manage login card visibility
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

    // Initialize Google Analytics
    if (typeof window !== 'undefined' && !window.GA_INITIALIZED) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', trackingId);
      window.GA_INITIALIZED = true;
    }

    // Track page view
    if (window.gtag) {
      window.gtag('config', trackingId, {
        page_path: window.location.pathname,
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      if (window.gtag) {
        window.gtag('event', 'login', {
          method: 'EmailPassword'
        });
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async () => {
    try {
      await account.create(ID.unique(), email, password, name);
      if (window.gtag) {
        window.gtag('event', 'sign_up', {
          method: 'EmailPassword'
        });
      }
      login(email, password);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </Script>

      <div className="flex flex-col items-center justify-center bg-gray-100 h-full space-y-4">
        {showLogin && (
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Access your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
              <div className="my-5">
                <Button onClick={() => login(email, password)}>
                  Login
                </Button>
              </div>
              <p className="ml-2">Dont have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setShowLogin(false)}>Register here</span></p>
            </CardContent>
          </Card>
        )}

        {!showLogin && (
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Create a new account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="register-name">Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
              <div className="my-5">
                <Button onClick={register}>
                  Register
                </Button>
              </div>
              <p className="ml-2">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setShowLogin(true)}>Login here</span></p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default LoginPage;
