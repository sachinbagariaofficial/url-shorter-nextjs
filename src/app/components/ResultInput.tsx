"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface inputPropsTypes {
  shortUrl: string;
}

const ResultInput = ({ shortUrl }: inputPropsTypes) => {
  const [copyStatus, setCopyStatus] = useState(false);
  const timeIdRef = useRef<NodeJS.Timeout | null>(null);
  const copyFunc = () => {
    setCopyStatus(true);
    toast.success("URL copied successfully!");
    navigator.clipboard.writeText(`https://url-weld.vercel.app/url/${shortUrl}`);
    timeIdRef.current = setTimeout(() => {
      setCopyStatus(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeIdRef.current !== null) {
        clearTimeout(timeIdRef.current);
        timeIdRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full mt-8">
      <p className="mb-2 text-xl text-start  text-black font-semibold text-gray-700 dark:text-gray-300">
        Here is short url generated:
      </p>
      <div className="relative">
        <label htmlFor="npm-install-copy-text" className="sr-only">
          Label
        </label>
        <input
          id="npm-install-copy-text"
          type="text"
          className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-m rounded-[30px] focus:ring-blue-500 focus:border-blue-500 block w-full p-[20px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={
            shortUrl.length > 0 ? `https://url-weld.vercel.app/url/${shortUrl}` : ""
          }
          disabled
          readOnly
        />
        <div className="absolute end-2.5 mr-3 top-1/2   -translate-y-1/2">
          <button
            onClick={copyFunc}
            data-copy-to-clipboard-target="npm-install-copy-text"
            className={` text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center border-gray-200 border ${
              !copyStatus ? "bg-[#f4e8cc]" : "bg-lightGreen"
            }   `}
          >
            <span
              id="default-message"
              className="inline-flex items-center bg-green-400"
            >
              <svg
                className="w-3 h-3 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
              </svg>
              <span className="text-xs font-semibold">
                {copyStatus ? "Copied" : "Copy"}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultInput;
