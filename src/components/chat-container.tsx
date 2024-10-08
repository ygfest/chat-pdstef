'use client';

import { Donut, Ghost, LoaderCircle, SendHorizonal } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { getFileMessages } from '@/prisma/actions/messages';
import { Message, useChat } from 'ai/react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { AIBubble, UserBubble } from './chat-bubble';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { toast } from 'sonner';

const ChatSection = ({ fileId }: { fileId: string }) => {
  const myRef = useRef<HTMLDivElement>(null);

  const [isFetching, startTransition] = useTransition();
  const [dbMessages, setDbMessages] = useState<Message[]>([]);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onResponse: async (response) => {
      
      const headers = response.headers
      const message = headers.get("message")
      console.log({message})

      const status = response.status;
      
      if (status >= 400)
        toast.error("Daily Limit Reached!", {description: message ?? ""});
    }
  });

  const scrollToBottom = () => {
    if (myRef.current) {
      myRef.current.scrollTop = myRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  useEffect(() => {
    startTransition(async () => {
      const fetchedMessages = await getFileMessages(fileId);
      if (!fetchedMessages) return
      const formattedMessages: {id: string, content: string, role: 'user' | 'assistant'}[] = fetchedMessages.map((message) => ({id: message.id, content: message.text, role: message.isUserMessage ? 'user' : 'assistant'}))
      setDbMessages(formattedMessages)
    })
  }, [fileId])

  return (
    <div className='flex flex-col w-full h-full justify-end gap-2'>
        { isFetching ? (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div className='flex flex-col gap-y-2 justify-center items-center h-[calc(100dvh-12rem)] max-h-calc(100dvh-8rem)]
                          bg-zinc-700 rounded-lg border border-zinc-700 w-full px-4'>
                  <div className='w-full mt-2 h-full rounded-md shadow px-4 overflow-auto'>
                    <Skeleton height={30} containerClassName="flex-1" count={30} className='mt-2'/>
                  </div>
            </div>
          </SkeletonTheme>
          ) : [...dbMessages, ...messages].length === 0 ? (
            <div  className='flex flex-col gap-y-2 justify-center items-center w-full h-[calc(100dvh-8rem)] bg-zinc-800 rounded-lg border border-zinc-700'>
                            <Ghost className='w-6 h-6 text-zinc-400'/>
                            <p className='text-zinc-500 font-medium text-sm'>{"It's a bit lonely around here..."}</p>
            </div>
          ) : (
          <div ref={myRef} className='justify-end w-full h-[calc(100dvh-8rem)] overflow-auto overflow-x-hidden
                                      shadow px-4 bg-zinc-800 rounded-lg border border-zinc-700'>
            {[...dbMessages, ...messages].map((m, i) => {
              return (
                <div key={i} className='my-4'>
                  { m.role === 'user' ? <UserBubble message={m.content as string}  /> : <AIBubble message={m.content as string} /> }
                </div>
              )
            })}
            { isLoading && (
              <div className='flex justify-center items-center gap-x-2 pb-2 text-zinc-400'>
                <p className='text-sm'>PDStef is thinking...</p>
                {/* <LoaderCircle className='w-4 h-4 animate-spin font-light'/> */}
                <Donut className='w-5 h-5 animate-spin font-light'/>
              </div>
            )}
          </div>
          )
        }
        <div>
  <form
    className="flex w-full h-full gap-2 items-end"
    onSubmit={async (e) => {
      handleSubmit(e, {
        options: { headers: { fileId: fileId } },
      });
    }}
  >
    <Textarea
      autoFocus
      rows={1}
      placeholder="Ask me something ..."
      className="resize-none text-base bg-zinc-800 text-zinc-300 outline-none h-full"
      value={input}
      onChange={handleInputChange}
      disabled={isFetching || isLoading}
    />

    <Button
      className="flex items-center gap-2 justify-between text-zinc-300 h-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-90 px-6"
      disabled={isFetching || isLoading}
    >
      <div className="flex flex-col">
        <span></span>
        <span>Send</span>
      </div>
      <div className="flex items-center justify-center h-full">
        <SendHorizonal className="h-4 w-4" />
      </div>
    </Button>
  </form>
</div>

    </div>
  )
}

export default ChatSection