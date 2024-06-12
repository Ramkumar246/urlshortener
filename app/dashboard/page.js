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
  {
    id: 4,
    url: "https://example.net",
    alias: "examplenetwork",
    expirationDate: "2024-11-20",
  },
  {
    id: 5,
    url: "https://test.com",
    alias: "test",
    expirationDate: "2025-01-15",
  },
  {
    id: 6,
    url: "https://dummy.com",
    alias: "dummy",
    expirationDate: "2024-12-31",
  },
  {
    id: 7,
    url: "https://sample.com",
    alias: "sample",
    expirationDate: "2025-01-15",
  },
  {
    id: 8,
    url: "https://example.test",
    alias: "exampletest",
    expirationDate: "2024-11-20",
  },
  {
    id: 9,
    url: "https://another.org",
    alias: "anotherorg",
    expirationDate: "2024-12-31",
  },
  {
    id: 10,
    url: "https://example.io",
    alias: "exampleio",
    expirationDate: "2025-01-15",
  },
  {
    id: 11,
    url: "https://example.com",
    alias: "example",
    expirationDate: "2024-12-31",
  },
  {
    id: 12,
    url: "https://another.com",
    alias: "another",
    expirationDate: "2025-01-15",
  },
  {
    id: 13,
    url: "https://example.org",
    alias: "exampleorg",
    expirationDate: "2024-11-20",
  },
];

const DashboardPage = () => {
  const [urls, setUrls] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [urlsPerPage] = useState(5); 
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");// Set the number of URLs per page

  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Your handleEdit, handleGenerateQRCode, and handleLogout functions remain unchanged
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
        setUrl("");
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


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Enter a URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={handleSubmit}
              className={`py-2 px-4 mb-4 text-white font-semibold rounded-md shadow-md `}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit URL"}
            </Button>
            {submissionMessage && <p className="mt-4 text-center text-red-600">{submissionMessage}</p>}
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
            {currentUrls.map((url) => (
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
                    onChange={(e) => handleEdit(url.id, "alias", e.target.value)}
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="datetime-local"
                    value={url.expirationDate}
                    onChange={(e) => handleEdit(url.id, "expirationDate", e.target.value)}
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => handleGenerateQRCode(url.url)}>Generate QR Code</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          urlsPerPage={urlsPerPage}
          totalUrls={urls.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

const Pagination = ({ urlsPerPage, totalUrls, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUrls / urlsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number}>
            <Button
              onClick={() => paginate(number)}
              className={`mx-1 ${
                currentPage === number ? " text-white" : ""
              }`}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardPage;
