import React, { useEffect, useState } from 'react'
import Time from "./time.svg"
import TimeWhite from "./timeWhite.svg"
import Mes from "./message.svg"
import MesWhite from "./messageWhite.svg"
import Ari from "./arri.jpg"
import Moon from "./moon.png"
import Sun from "./sun.png"
import Tatang from "./tatang.jpg"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "./firebase"
const App = () => {
  const [dateState, setDateState] = useState(new Date());
  const [isMorning, setIsMorning] = useState(true);
  useEffect(() => {
    setInterval(() =>
      setDateState(new Date()), 1000);
    return () => {
      clearInterval()
    }
  }, []);

  useEffect(() => {
    const hour = dateState.getHours()
    if (hour > 17 || hour < 5) {
      setIsMorning(false)
    } else {
      setIsMorning(true)
    }

  }, [dateState])

  const [locked, setLocked] = useState(true)

  const onChangeLockedText = (e) => {
    if (e === 'iloveyou') {
      setLocked(false)
    }
  }

  const [myData, setMyData] = useState()
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('created', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      setMyData(querySnapshot.docs.map(e => ({
        message: e.data().text,
        date: `${new Date(e.data().created.seconds * 1000).getDate()}-${new Date(e.data().created.seconds * 1000).getMonth()+1}-${new Date(e.data().created.seconds * 1000).getFullYear()}` 
      })))
    })
  }, [])
  return (
    <>
      {locked && (
        <div style={{ backdropFilter: "blur(5px)" }} className='w-full h-screen bg-black bg-opacity-70 absolute inset-0 z-30'>
          <div className='flex justify-center items-center h-full'>
            <div className='p-3` bg-white rounded-lg'>
              <input onChange={(e) => onChangeLockedText(e.target.value)} placeholder='Insert Key' className='ring-1 rounded-lg px-2 ring-gray-500' />
            </div>
          </div>
        </div>
      )}
      <div className={`w-full overflow-hidden relative max-h-screen h-screen transition-colors duration-1000 ${isMorning ? 'bg-white' : 'bg-black'} flex justify-center items-center`}>
        {!isMorning && (
          <img src={Tatang} className='w-full object-cover absolute inset-0' alt='tatang' />
        )}
        <img src={isMorning ? Sun : Moon} className={`absolute right-10 top-10 ${isMorning ? 'w-36' : 'w-20'}`} alt='moon' />
        <Name isMorning={isMorning} />
        <Messages myData={myData} isMorning={isMorning} />
        <DateTime isMorning={isMorning} />
      </div></>
  )
}

const Name = ({ isMorning }) => {
  return (
    <div className={`font-serif z-10 text-xl tracking-wider md:text-3xl xl:text-5xl italic transition-colors duration-1000 ${isMorning ? 'text-black' : 'text-white'}`}>Lily Putri Marito</div>
  )
}

const Modal = ({ myData, setIsOpen, isMorning }) => {
  console.log(myData);
  return (
    <div className="absolute w-full h-screen z-10 bg-black bg-opacity-40 flex justify-center items-center">
      {/* modal */}
      <div className={`relative ${isMorning ? 'bg-white' : 'bg-gray-900'} rounded-lg w-2/3 md:w-1/4 p-4 flex flex-col space-y-3`}>
        <div className={`text-sm italic text-left ${isMorning ? 'text-black' : 'text-white'}`}>Today's Greeting</div>
       <div className='max-h-96 overflow-y-auto gap-y-4 flex flex-col'>
       {
          myData.length > 0 && myData.map((e, index) => (
            <div key={index} className="flex space-x-2 items-start justify-end">
              <div title={e.date} className={`text-sm w-auto p-2 rounded-xl ${isMorning ? 'bg-gray-400 text-white' : 'text-black bg-gray-400'}`}>{e.message}</div>
              <div>
                <div className="h-10 w-10 rounded-full bg-gray-400">
                  <img src={Ari} className="w-full h-full rounded-full object-cover" alt="logo" />
                </div>
              </div>
            </div>
          ))
        }
       </div>
        <div className="pt-4 flex justify-end">
          <button onClick={() => setIsOpen(false)} className={`px-8 border py-1 text-sm ${isMorning ? 'bg-blue-400 text-white' : 'text-black bg-gray-400'} rounded-md`}>Close</button>
        </div>
      </div>
    </div>
  )
}

const Messages = ({ myData, isMorning }) => {
  const message = process.env.REACT_APP_MESSAGES
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {isOpen && (
        <Modal myData={myData} setIsOpen={setIsOpen} isMorning={isMorning} />
      )}
      <div className="absolute bottom-0 right-0 p-4 md:p-8 flex space-x-2 items-center">
        <div onClick={() => setIsOpen(!isOpen)} className="relative cursor-pointer">
          {
            message &&
            <div className="absolute -top-2 -right-2 bg-red-600 rounded-full h-4 w-4 md:h-6 md:w-6 text-xs text-white justify-center items-center flex">1</div>
          }
          <img src={isMorning ? Mes : MesWhite} className="h-8 md:h-12" alt="logo" />
        </div>
      </div>
    </>
  )
}

const DateTime = ({ isMorning }) => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() =>
      setDateState(new Date()), 1000);
  }, []);
  return (
    <div className={`absolute bottom-0 left-0 p-4 flex space-x-2 items-center ${isMorning ? 'text-black' : 'text-white'}`}>
      <img src={isMorning ? Time : TimeWhite} className="h-3 md:h-5 text-white" alt="logo" />

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