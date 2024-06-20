import React, { useState , useCallback , useEffect , useRef} from 'react'

function App() {
  const [length , setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")
  
  const passwordRef = useRef(null)
  

  const passwordGen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if( numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%&*+_-=~"

    for (let i = 1 ; i  <= length; i ++) {
   let char = Math.floor(Math.random()*str.length + 1)
   pass += str.charAt(char)
   
    }
    setPassword(pass)
  } , [length , numberAllowed , charAllowed , setPassword])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select() // jo copy kia h use highlight krne k liye
    //passwordRef.current?.setSelectionRange(0,3); agr 3 hi words select krne h starting k
    window.navigator.clipboard.writeText(password) // window object provides a property to read or write selected text to clipboard
  }, [password])


  useEffect(() => {passwordGen()}, [length,numberAllowed,charAllowed, passwordGen])

   
  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500'>
    <h1 className='text-white text-center my-3'> Password Generator</h1>
   <div className='flex shadow rounded-lg overflow-hidden mb-4' >
    <input type="text" 
    value={password}
    className='outline-none w-full py-1 px-3 '
    placeholder='password'
    readOnly
    ref = {passwordRef} /> //reference dene k liye
    <button onClick = {copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
   </div>
   <div className='flex text-5m gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type="range" 
      min ={6}
      max= {20}
      value= {length}
      className='cursor-pointer'
      onChange={(e) => {setLength(e.target.value)}}/>
      <label>Length:{length}</label>

    </div>
    <div className='flex item-center gap-x-1'>
      <input type="checkbox"
      defaultChecked ={numberAllowed}
      id="numberInput"
      onChange={()=>{setnumberAllowed((prev) => !prev);

      }}
      />
      <label htmlFor='numberInput'> Numbers</label>
    </div>
    <div className='flex item-center gap-x-1'>
      <input type="checkbox"
      defaultChecked ={charAllowed}
      id="characterInput"
      onChange={()=>{setCharAllowed((prev) => !prev);

      }}
      />
      <label htmlFor='characterInput'> Characters</label>
    </div>

   </div>
   </div>
   
   </>
      
  )
}

export default App
