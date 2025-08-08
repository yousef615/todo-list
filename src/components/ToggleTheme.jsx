export default function ToggleTheme ( {darkMode, setDarkMode}) {
    return (
    <div className=" theme text-base!  rounded-2xl relative
    bg-gray-700 text-white  dark:bg-gray-200  
   w-13 h-7 hover:shadow-[5px_5px_40px_-4px_rgb(0,0,0)]!
   dark:hover:shadow-[5px_5px_40px_-4px_rgb(255,255,255)]!
     border-2 
   outline-gray-400 border-gray-500
   " 
   onClick={(() => {setDarkMode(prev => !prev)})}>
       {!darkMode ?<span className="d"></span> : <span className="l"></span>}</div>
    )
}