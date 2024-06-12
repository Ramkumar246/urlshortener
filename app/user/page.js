"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { account } from "../appwrite"; // Adjust the import path as needed

const UserPage = () => {
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        console.error("No active session found", error);
        router.push("/"); // Redirect to login if no user session
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionMessage("");

    try {
      // Replace 'https://example.com/api/submit-url' with your actual API endpoint
      const response = await fetch('https://example.com/api/submit-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionMessage("URL submitted successfully!");
      } else {
        setSubmissionMessage(data.message || "Failed to submit URL.");
      }
    } catch (error) {
      console.error("Failed to submit URL", error);
      setSubmissionMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <p className="text-xl font-semibold text-gray-700 mb-4">Welcome, {user.name}</p>
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleSubmit}
          className={`w-full py-2 px-4 mb-4 ${isSubmitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"} text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit URL"}
        </Button>
        <Button
          onClick={handleLogout}
          className="w-full py-2 px-4 mb-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </Button>
        {submissionMessage && <p className="mt-4 text-center text-red-600">{submissionMessage}</p>}
      </div>
    </div>
  );
};

export default UserPage;
