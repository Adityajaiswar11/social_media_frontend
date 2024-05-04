import { useState ,useEffect} from "react"


const SampleComponent = ()=>{
 const [count,setCount]= useState(0)

 
    console.log("render ")
  
return(
   <>
    <h1>Counter</h1>

    <h1>{count}</h1>
    <button onClick={()=>setCount((prevValue)=>prevValue+1)}>Increase </button>
    <button onClick={()=>setCount((prevValue)=>prevValue-1)}>Decrease </button>
   </>
)
}

export default SampleComponent