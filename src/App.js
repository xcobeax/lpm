import React, { useEffect, useState } from 'react'
import Time from "./time.svg"
import Mes from "./message.svg"
import Ari from "./arri.jpg"

const App = () => {
  return (
    <div className="w-full max-h-screen h-screen bg-white flex justify-center items-center">
      <Name />
      <Messages />
      <DateTime />
    </div>
  )
}

const Name = () => {
  return (
    <div className="font-serif text-xl tracking-wider md:text-3xl xl:text-5xl italic">Lily Putri Marito</div>
  )
}

const Modal = ({ setIsOpen }) => {
  const message = process.env.REACT_APP_MESSAGES
  return (
    <div className="absolute w-full h-screen z-10 bg-black bg-opacity-40 flex justify-center items-center">
      {/* modal */}
      <div className="relative bg-white rounded-lg w-2/3 md:w-1/4 p-4 flex flex-col space-y-3">
        <div className="text-sm italic text-left">Today's Greeting</div>
        <div className="flex space-x-2 items-start justify-end">
          <div className="text-sm w-auto bg-gray-400 p-2 rounded-xl text-white">{message}</div>
          <div>
            <div className="h-10 w-10 rounded-full bg-gray-400">
              <img src={Ari} className="w-full h-full rounded-full object-cover" alt="logo" />
            </div>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <button onClick={() => setIsOpen(false)} className="px-8 border py-1 text-sm bg-blue-400 text-white rounded-md">Close</button>
        </div>
      </div>
    </div>
  )
}

const Messages = () => {
  const message = process.env.REACT_APP_MESSAGES
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} />
      )}
      <div className="absolute bottom-0 right-0 p-4 md:p-8 flex space-x-2 items-center">
        <div onClick={() => setIsOpen(!isOpen)} className="relative cursor-pointer">
          {
            message &&
            <div className="absolute -top-2 -right-2 bg-red-600 rounded-full h-4 w-4 md:h-6 md:w-6 text-xs text-white justify-center items-center flex">1</div>
          }
          <img src={Mes} className="h-8 md:h-12" alt="logo" />
        </div>
      </div>
    </>
  )
}

const DateTime = () => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() =>
      setDateState(new Date()), 1000);
  }, []);
  return (
    <div className="absolute bottom-0 left-0 p-4 flex space-x-2 items-center">
      <img src={Time} className="h-3 md:h-5" alt="logo" />

      <div className="text-xs md:text-base">
        {dateState.toLocaleString('en-US', {
          second: '2-digit',
          hour: '2-digit',
          minute: 'numeric',
          hour12: false,
        })}
      </div>
    </div>
  )
}

export default App