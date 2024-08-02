"use client";

import React, { useContext } from 'react';
import SidePanel from '@/components/sidepanel';
import FileViewer from '@/app/main/pdf-viewer';
import ChatCard from '@/app/main/chatcard';
import NavigationBar from '@/components/navbar';
import { SidePanelProvider, SidePanelContext } from '@/app/context/SidePanelProvider';

const Page = () => {
  return (
    <SidePanelProvider>
      <PageContent />
    </SidePanelProvider>
  );
};

const PageContent = () => {
  const context = useContext(SidePanelContext);
  if (!context) {
    return null; // or some fallback UI
  }

  const { isOpen } = context;

  return (
    <div className={`flex flex-col lg:flex-row h-screen max-h-screen max-w-screen bg-zinc-950 transition-all duration-300 ${!isOpen ? 'gap-14' : 'gap-64'} justify-center`}>
      <div>
        <SidePanel />
      </div>
      <div className={`flex flex-col justify-center w-[80%] gap-2`}>
        <div className='flex'>
          <NavigationBar />
        </div>
        
        <div className='flex flex-row w-full h-[600px] gap-4 justify-between'>
          <FileViewer />
          <ChatCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
