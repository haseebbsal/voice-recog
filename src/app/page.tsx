import { IoSend } from "react-icons/io5";
export default function Home() {
  return (
    <>
      <div className="flex-col h-[100%] px-8">
        <div className="h-[90%] flex justify-center items-center">
          <p>Start Prompting</p>
        </div>
        <form className="h-[10%] flex">
          <div className=" w-[80%] m-auto flex rounded-md border p-[0.5rem]">
            <input placeholder="Enter Prompt" className="outline-none  w-[95%] bg-transparent" type="text" name="prompt" />
            <IoSend className="text-xl" />
          </div>
        </form>
      </div>
    </>
  );
}
