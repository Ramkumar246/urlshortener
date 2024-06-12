"use client";
import { useState } from "react";
// import { Appwrite } from 'appwrite';
import { Client, Functions, ExecutionMethod } from "appwrite";
import QRCode from "../../components/QRCode"

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
import Script from 'next/script';

const dummyData = [

];


const DashboardPage = () => {
  const [urls, setUrls] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [urlsPerPage] = useState(5); 
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");// Set the number of URLs per page

  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl);
  const router = useRouter();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (id, key, value) => {
    setUrls((prevUrls) =>
      prevUrls.map((url) => (url.id === id ? { ...url, [key]: value } : url))
    );
  };

  const handleGenerateQRCode = (url) => {
    if (window.gtag) {
      window.gtag('event', 'generate_qr_code', {
        event_category: 'Button',
        event_label: url,
      });
    }
    console.log("Generate QR code for:", url);
  };

  const handleLogout = async () => {
    if (window.gtag) {
      window.gtag('event', 'logout', {
        event_category: 'Button',
      });
    }
    try {
      await account.deleteSession("current");
      router.replace("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const data = {
    "originalURL": "https://agilecyber.com",
    "user_id": "66694ad10002a9d51628",
    "custom_alias": null,
    "expiration_time":"2024-06-12 01:01:10"
}
// const a = JSPN.stringify(data)
// console.log(a)

  const handleSubmit = async () => {
    if (window.gtag) {
      window.gtag('event', 'submit_url', {
        event_category: 'Button',
        event_label: url,
      });
    }
    setIsSubmitting(true);
    setQrCodeUrl("");
    setSubmissionMessage("");
    // const response = await client.call('functions', 'Shorten url');
    //   console.log(response);
    //   const promise = functions.createExecution(
    //     '6669622d002e44cf3510',  // functionId
    //     data,  // body (optional)
    //     false,  // async (optional)
    //     '<PATH>',  // path (optional)
    //     'POST',  // method (optional)
    //     {} // headers (optional)
    // );
    // promise.then(function (response) {
    //     console.log(response); // Success
    // }, function (error) {
    //     console.log(error); // Failure
    // });

  

    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('666927680026e4e78388'); // Your project ID
    
    const functions = new Functions(client);
    
    const result = await functions.createExecution(
        '6669622d002e44cf3510', // functionId
        '', // body (optional)
    false, // async (optional)
    '/', // path (optional)
    ExecutionMethod.POST, // method (optional)
    {} // headers (optional) // search (optional)
    );
    
    console.log(result);
    const responseBody = result.responseBody
    console.log(responseBody)
    let responseObject;
if (responseBody.trim() !== '') {
    responseObject = JSON.parse(responseBody);
} else {
    responseObject = {};
}

// Extract the shortened URL
const shortenedURL = responseObject.shortenedURL;

// Log the shortened URL to the console
console.log('Shortened URL:', shortenedURL);
setQrCodeUrl(shortenedURL);
 // Your project ID

    // try {
    //   // Replace 'https://example.com/api/submit-url' with your actual API endpoint
    //   const response = await fetch('https://cloud.appwrite.io/v1/functions/6669622d002e44cf3510/executions', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ url }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     setSubmissionMessage("URL submitted successfully!");
    //     setUrl("");
    //   } else {
    //     setSubmissionMessage(data.message || "Failed to submit URL.");
    //   }
    // } catch (error) {
    //   console.error("Failed to submit URL", error);
    //   setSubmissionMessage("An error occurred. Please try again.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleCopy = (text, type) => {
    if (window.gtag) {
      window.gtag('event', 'copy', {
        event_category: 'Input',
        event_label: `${type}: ${text}`,
      });
    }
  };

  const handleCopyEvent = (e, type) => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      handleCopy(selectedText, type);
    }
  };

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-DJNXR1J63Y`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DJNXR1J63Y');
        `}
      </Script>

      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
          <div className="mb-8">
            <input
              type="text"
              placeholder="https://agilecyber.com/"
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
            {qrCodeUrl && <QRCode url={qrCodeUrl} width={400} />}
            {qrCodeUrl && <h1>{qrCodeUrl}</h1>}
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
                      onCopy={(e) => handleCopyEvent(e, "URL")}
                      className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={url.alias}
                      onChange={(e) => handleEdit(url.id, "alias", e.target.value)}
                      onCopy={(e) => handleCopyEvent(e, "Alias")}
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
    </>
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
              className={`mx-1 ${currentPage === number ? "text-white" : ""}`}
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
