'use client';
import { IoSend } from "react-icons/io5";
import { FormEvent, useEffect, useState } from "react";
import { FaBloggerB, FaMicrophone } from "react-icons/fa";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineAttachFile } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { useMutation } from "react-query";
import axiosInstance from "@/utils/axiosInstance";
import { WavRecorder } from "webm-to-wav-converter";
import Image from "next/image";
type ChatMessages = {
  image?:string,
  message?: string,
  id: number,
  audio?: string,
}

type LLM_Data = {
  task_name: string,
  priority:string[]
}
export default function Home() {
  const [startRecording, setStartRecording] = useState(false)
  const [showFileOptions,setShowFileOptions]=useState(false)
  const [timer, setTimer] = useState('0:00')
  const [recorder, setRecorder] = useState(new WavRecorder())
  const [chats, setChats] = useState<null | ChatMessages[]>(null)
  const [audio, setAudio] = useState<null | Blob>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [image, setImage] = useState<any>()
  const [pdf, setPDF] = useState<any>()
  const [prompt,setPrompt]=useState<null|string>(null)
  const [intervaID,setIntervalID]=useState<NodeJS.Timeout|null>(null)
  const formSubmitMutation = useMutation((data:FormData) => axiosInstance.postForm('/prompt', data), {
    onSuccess(data) {
      setChats((chats) => {
        // console.log(data.data)
        // const { data:llmData, id } = data.data
        // console.log(llmData, id)
        let message='Tasks Allocated To Matrix'
        // llmData.forEach((e:LLM_Data) => {
        //   message += `${e.task_name} : ${e.priority.join(' and ') }.   `
        // })
        if (chats) {
          return [...chats, { message, id:1 }]
        }
        else {
          return [{ message, id:1}]
        }
      })
      setImageBase64(null)
      setAudio(null)
      setImage(null)
      setPDF(null)
      setPrompt(null)
        // console.log(data.data)
    },
  })
  function recordingStart() {
    setStartRecording(true)
    setShowFileOptions(false)
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
    setIntervalID(interval)
    recorder.start();
    } 
  // console.log(recorder)
  async function stopRecord() {
    setStartRecording(false)
    setTimer('0:00')
    clearInterval(intervaID!)
    recorder.stop();
    setTimeout(async () => {
      const blob = await recorder.getBlob(true);
      setAudio(blob!)
      // console.log(blob)
    },0)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData()
    if (audio) {
      formData.set('audio',audio,'random12.wav')
    }
    if (image) {
      formData.set('image',image)
    }
    if (pdf) {
      formData.set('pdf', pdf)
    }
    if (prompt) {
      formData.set('prompt',prompt)
    }
    console.log([...formData.entries()])
    formSubmitMutation.mutate(formData)
    const message = formData.get('prompt')

    if (message) {
      setChats((chat) => {
        if (chat) {
          return [...chat, { message:message as string,id:0,image:imageBase64 } as ChatMessages]
        }
        return [{ message: message as string, id: 0, image: imageBase64 } as ChatMessages]
      })
    }
    form.reset()
  }
  return (
    <>
      <div className="flex-col flex w-auto sm:w-[60%] sm:justify-between sm:m-auto h-[90vh] px-4 sm:px-8">
        <div className={`sm:h-[80%] h-[65%] overflow-auto flex flex-col gap-2 ${chats ? 'p-4' :'justify-center items-center'}`}>
          {chats ?
            chats.map((e: ChatMessages, index: number) => {
              if (e.id) {
                return (
                  <div key={index} className="p-4 break-all gap-4 flex flex-col items-end flex-wrap bg-gray-700 rounded-lg">
                      <RiRobot2Fill className="text-2xl" />
                      <p>{e.message}</p>
                    </div>
                )
              }
              if (e.image) {
                return (
                  <div key={index} className="p-4 break-all gap-4 flex flex-wrap bg-gray-700 rounded-lg">
                    <FaRegCircleUser className="text-2xl" />
                    <div className="w-full h-[10rem]">
                      <Image src={e.image} alt="user image" className="object-contain w-full h-full" width={100} height={100}/>
                    </div>
                    <p>{e.message}</p>
                  </div>
                )
              }
              return (
                <div key={index} className="p-4 break-all gap-4 flex flex-col flex-wrap bg-gray-700 rounded-lg">
                  <FaRegCircleUser className="text-2xl" />
                  <p>{e.message}</p>
                </div>
              )
            }
            )
            :
            <div className="flex flex-col items-center gap-4">
              {/* <SiConstruct3 className="text-5xl text-white" /> */}
              <p className="text-2xl">How can I help you today?</p>
            </div>
          }
        </div>
        <form className="h-[20%] flex" onSubmit={handleSubmit}>
          <div className=" w-full m-auto gap-2 flex rounded-md border p-[0.5rem]">
            {!startRecording &&
              <div className="relative">
                {showFileOptions && <div className="absolute rounded top-[-7rem] bg-gray-700 p-4 flex flex-col gap-2">
                  <div className="relative">
                    <label className="cursor-pointer" htmlFor="image">Image</label>
                    <input className="absolute w-full h-full invisible top-0 left-0 " onChange={(e) => {
                      const file = e.target.files![0]
                      const formData=new FormData()
                      // setImage(file)
                      formData.set('image',file)
                      formSubmitMutation.mutate(formData)
                      // setChats((chat) => {
                      //   if (chat) {
                      //     return [...chat, { image: imageBase64 } as ChatMessages]
                      //   }
                      //   return [{ image: imageBase64 } as ChatMessages]
                      // })
                      const fileReader = new FileReader()
                      fileReader.onload = (event) => {
                        setChats((chat) => {
                          if (chat) {
                            return [...chat, { image: fileReader.result } as ChatMessages]
                          }
                          return [{ image: fileReader.result } as ChatMessages]
                        })
                        // setImageBase64(fileReader.result as string)
                      }
                      fileReader.readAsDataURL(file)
                      
                    }} type="file" name="image" id="image" />
                  </div>
                  <div className="relative">
                    <label className="cursor-pointer" htmlFor="pdf">Document</label>
                    <input className="absolute w-full h-full invisible top-0 left-0 " type="file" name="pdf" id="pdf" onChange={(e) => {
                      const file = e.target.files![0]
                      // const file = e.target.files![0]
                      const formData = new FormData()
                      // setImage(file)
                      formData.set('pdf', file)
                      formSubmitMutation.mutate(formData)
                      setChats((chat) => {
                        if (chat) {
                          return [...chat, { message:'Read This Document' } as ChatMessages]
                        }
                        return [{ message:'Read This Document' } as ChatMessages]
                      })
                      // setPDF(file)
                    }} />
                  </div>
                </div>}
                <button type="button"><MdOutlineAttachFile onClick={()=>{setShowFileOptions(!showFileOptions)}} className="text-xl" /></button>
              </div>
            }
            {startRecording ?<p className="text-red-900 w-[95%] animate-pulse">Recording</p>: <input placeholder="Enter Prompt" onChange={(e)=>{
              setPrompt(e.target.value)
            }} required className="outline-none  w-[95%] bg-transparent" type="text" name="prompt" />}
            <div className="flex gap-4">
              {!startRecording &&<button type="submit"><IoSend className="text-xl" /></button>}
              {/* <button type="button">
                {startRecording ? <FaMicrophoneAltSlash className="text-xl" id='stop' onClick={stopRecord}  /> : <FaMicrophone className="text-xl" onClick={recordingStart}/>}
              </button> */}
              {startRecording && <p>{ timer}</p>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
