'use client';
import { IoSend } from "react-icons/io5";
import { FormEvent, useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineAttachFile } from "react-icons/md";
type ChatMessages = {
  message:string
}
export default function Home() {
  const [startRecording, setStartRecording] = useState(false)
  const [timer, setTimer] = useState<string>('0:00')
  const [intervalId, setIntervalId] = useState<null | NodeJS.Timeout>()
  const [chats,setChats]=useState<null| ChatMessages[] >(null)
  function recordingStart() {
    setStartRecording(true)
    let interval = setInterval(() => {
      setTimer((timer) => {
        const time = timer.split(':')
        let minutes:number =parseInt(time[0])
        let seconds: number = parseInt(time[1])
        if (seconds == 59) {
          minutes+=1
          return `${minutes}:00`
        }
        else {
          seconds += 1
          return `${minutes}:${seconds > 9 ? seconds : `0${seconds}`}`
        }
      })
    }, 1000)
    setIntervalId(interval)
  }
  function stopRecording() {
    setStartRecording(false)
    clearInterval(intervalId!)
    setIntervalId(null)
    setTimer('0:00')
  }

  function handleSubmit(e:FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const message = (form[1] as HTMLInputElement).value
    if (message) {
      setChats((chat) => {
        if (chat) {
          return [...chat, { message }]
        }
        return [{ message }]
      })
      form.reset()
    }

  }
  return (
    <>
      <div className="flex-col h-[100%] px-8">
        <div className={`h-[90%] flex flex-col gap-4 ${chats ? 'p-4' :'justify-center items-center'}`}>
          {chats ?
            chats.map((e: ChatMessages,index:number) => <div key={index} className="p-4 gap-4 flex bg-gray-700 rounded-lg">
              <FaRegCircleUser className="text-2xl"/>
              <p>{e.message}</p>
            </div>)
            :
            <p>Start Prompting</p>
          }
        </div>
        <form className="h-[10%] flex" onSubmit={handleSubmit}>
          <div className=" w-[80%] m-auto gap-2 flex rounded-md border p-[0.5rem]">
            {!startRecording && <button><MdOutlineAttachFile className="text-xl" /></button>}
            {startRecording ?<p className="text-red-900 w-[95%] animate-pulse">Recording In Progress</p>: <input placeholder="Enter Prompt" className="outline-none  w-[95%] bg-transparent" type="text" name="prompt" />}
            <div className="flex gap-4">
              {!startRecording && <button type="submit"><IoSend className="text-xl" /></button> }
              <button type="button">
                {startRecording ? <FaMicrophoneAltSlash className="text-xl"  onClick={stopRecording} /> : <FaMicrophone className="text-xl" onClick={recordingStart}/>}
              </button>
              {startRecording && <p>{ timer}</p>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
