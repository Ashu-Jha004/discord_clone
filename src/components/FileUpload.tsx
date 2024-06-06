"use client";
import React from "react";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
interface FileUploadProps {
  onchange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ onchange, value, endpoint }: FileUploadProps) => {
  const filetype = value?.split(".").pop();
  if (value && filetype != "pdf") {
    return (
      <>
        <div className="releative h-36 w-36">
          <Image
            width={100}
            height={100}
            src={value}
            alt="Upload"
            className="rounded-full h-full w-full"
          />
          <button
            onClick={() => {
              onchange("");
            }}
            className="bg-rose-500 text-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </>
    );
  } else if (value && filetype === "pdf") {
    return (
      <div className="releative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-500" />
        <a
          href={value}
          target="_blank"
          rel="noonpener noreferrer"
          className="ml-2 text-2m text-indigo-500 dark:text-indigo-500"
        >
          {value}
        </a>
        <button
          onClick={() => {
            onchange("");
          }}
          className="bg-rose-500 text-500 text-white p-1 rounded-full absolute top-2 right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onchange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </>
  );
};

export default FileUpload;
