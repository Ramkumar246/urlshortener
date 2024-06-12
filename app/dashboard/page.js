"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { account } from "../appwrite"; // Adjust the import path as needed
import { Button } from "@/components/ui/button";

const dummyData = [
  {
    id: 1,
    url: "https://example.com",
    alias: "example",
    expirationDate: "2024-12-31",
  },
  {
    id: 2,
    url: "https://another.com",
    alias: "another",
    expirationDate: "2025-01-15",
  },
  {
    id: 3,
    url: "https://example.org",
    alias: "exampleorg",
    expirationDate: "2024-11-20",
  },
];

const DashboardPage = () => {
  const [urls, setUrls] = useState(dummyData);
  const router = useRouter();

  const handleEdit = (id, key, value) => {
    setUrls((prevUrls) =>
      prevUrls.map((url) => (url.id === id ? { ...url, [key]: value } : url))
    );
  };

  const handleGenerateQRCode = (url) => {
    // Add your QR code generation logic here
    console.log("Generate QR code for:", url);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.replace("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
          <Button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </Button>
        </div>
        <Table>
          <TableCaption>A list of your URLs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Alias</TableHead>
              <TableHead>Expiration Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell>
                  <input
                    type="text"
                    value={url.url}
                    onChange={(e) => handleEdit(url.id, "url", e.target.value)}
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={url.alias}
                    onChange={(e) =>
                      handleEdit(url.id, "alias", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="date"
                    value={url.expirationDate}
                    onChange={(e) =>
                      handleEdit(url.id, "expirationDate", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleGenerateQRCode(url.url)}
                    className="py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Generate QR Code
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;
