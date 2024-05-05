"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const UrlInput = ({ ShortUrlId, setCustomUrlId, customUrlID }: any) => {
  const [urlInput, setUrlInput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false); 

  const generateUrl = async () => {
    if (urlInput.length > 0 && !isGenerating) {
      setIsGenerating(true); 
      try {
        const response = await fetch(`https://url-weld.vercel.app/url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: urlInput }),
        });

        const urlResult = await response.json();
        console.log("urlResult", urlResult);
        if (urlResult.statusCode !== 200) {
          toast.error(urlResult.message || "Error while shortening URL");
        }
        if (urlResult.urlID) {
          ShortUrlId(urlResult.urlID);
        }
      } catch (err) {
        toast.error("Please try again later");
        console.log("error", err);
      } finally {
        setIsGenerating(false); 
      }
    } else {
      toast.error("Please enter a URL");
    }
  };

  const restFunc = () => {
    setUrlInput("");
    setCustomUrlId("");
  };

  return (
    <div>
      <ToastContainer />
      <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
        <div className="relative rounded-full overflow-hidden bg-white shadow-xl w-full">
          <input
            type="text"
            name="text"
            value={urlInput}
            placeholder="Paste the URL to be shortened"
            onChange={(e) => setUrlInput(e.target.value)}
            className="input bg-transparent outline-none border-none pl-6 pr-10 py-5 w-full font-sans text-lg "
          />
          <div className="absolute right-2 top-[0.4em]">
            <button
              onClick={generateUrl}
              disabled={isGenerating} 
              className={`w-14 h-14 rounded-full bg-brand button-custom  group shadow-xl flex items-center justify-center relative overflow-hidden ${isGenerating ? 'cursor-not-allowed bg-disableBrand' : ''}`}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
              >
                <path
                  d="M63.6689 29.0491L34.6198 63.6685L0.00043872 34.6194L29.0496 1.67708e-05L63.6689 29.0491Z"
                  fill="white"
                  fillOpacity="0.01"
                ></path>
                <path
                  d="M42.8496 18.7067L21.0628 44.6712"
                  stroke="white"
                  strokeWidth="3.76603"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M26.9329 20.0992L42.85 18.7067L44.2426 34.6238"
                  stroke="white"
                  strokeWidth="3.76603"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="w-full h-full rotate-45 absolute left-[32%] top-[32%] bg-black group-hover:-left-[100%] group-hover:-top-[100%] duration-1000"></div>
              <div className="w-full h-full -rotate-45 absolute -left-[32%] -top-[32%] group-hover:left-[100%] group-hover:top-[100%] bg-black duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
      {customUrlID && (
        <div className="w-full">
          <button className="rest mt-5 font-normal m-auto " onClick={restFunc}>
            Rest
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlInput;
