// components/SidePanel.tsx
"use client";

import { FaBars, FaCommentAlt, FaUser, FaCog } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from 'react';
import UploadFile from '@/app/main/uploadfile';
import { SidePanelContext } from '@/app/context/SidePanelProvider';
import { UploadButton, UploadDropzone } from '@/utils/uploadthing';


const SidePanel = () => {
  const context = useContext(SidePanelContext);
  



  if (!context) {
    throw new Error('SidePanel must be used within a SidePanelProvider');
  }

  const { isOpen, togglePanel, profileUrl, setProfileUrl } = context;

  return (
    <div className="relative z-10">
      <div className={`fixed top-0 left-0 h-full bg-zinc-800 text-zinc-300 transition-all duration-300 flex flex-col justify-between ${isOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 flex-grow">
          <Button
            variant="ghost"
            onClick={togglePanel}
            className="rounded-full p-2 top-4 left-4 z-50 transition-all duration-300 hover:none "
          >
            <FaBars />
          </Button>

         {isOpen && <UploadDropzone 
          endpoint='profilePicture'
          
          appearance={{
            container: {
              border: '1px dotted white',
              borderRadius: '1rem'

            },
            button: {
              background: 'gray'
            },
            label: {
              color: 'white'
            } 
          }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert(`Upload Completed: ${res[0].url}`);
            setProfileUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
           />} 

          <div className={`pt-[60px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <p className="font-bold text-sm mb-2">Recent Convos</p>
          </div>

          <ul className="space-y-2">
            {["Software Engineering", "Software Engineering", "Software Engineering", "Software Engineering"].map((text, index) => (
              <li key={index} className="flex items-center">
                <FaCommentAlt className="mr-2" />
                <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaUser className="mr-2" />
              <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Profile</span>
            </li>
            <li className="flex items-center">
              <FaCog className="mr-2" />
              <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Settings</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
