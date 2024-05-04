"use client";

import Image from "next/image";
import UrlInput from "./components/UrlInput";
import ResultInput from "./components/ResultInput";
import { useState } from "react";

export default function Home() {
  const [customUrlID, setCustomUrlId] = useState("");

  const ShortUrlId = (id: string) => {
    setCustomUrlId(id);
    console.log("id", id);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 md:p-24">
      <main className="space-y-40 ">
        <div className="relative" id="home">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
            <div className="relative ml-auto">
              <div className="lg:w-2/3 text-center mx-auto">
                <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                  Link Shortener.
                  <br />
                  <span className="text-[#9334e9] dark:text-white ">
                    URL Trim.
                  </span>
                </h1>
                <p className="mt-8 text-gray-700 dark:text-gray-300">
                  We offers a convenient solution for shortening URLs and
                  creating concise links for effortless sharing. Our URL
                  shortener tool enables you to generate shortened links quickly
                  and easily.
                </p>

                <UrlInput
                  ShortUrlId={ShortUrlId}
                  setCustomUrlId={setCustomUrlId}
                  customUrlID={customUrlID}
                />

                {customUrlID.length > 0 && (
                  <div>
                    <ResultInput shortUrl={customUrlID} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
