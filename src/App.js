import React from "react";
import Navbar from "./components/Navbar";
import { apiUrl,filterData } from "./data";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { useEffect,useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";


const App = () => {
  
  const [courses,setCourses] = useState(null)

  const [loading,setLoading] = useState(true)

  const [category , setCategory] = useState(filterData[0].title)


  async function fetchData() {
    setLoading(true)
      try {
        const res = await fetch(apiUrl)
        const data = await res.json()
        setCourses(data.data)
      }
      catch(error) {
        toast.error("Something went wrong")
    }
    setLoading(false)
  }

  useEffect( () => {
    fetchData()
  },[])

  return(
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <Navbar />
      <div className="bg-bgDark2">
      <Filter category={category} setCategory={setCategory} filterData={filterData} />
      <div className="w-11/12 mx-auto flex flex-wrap justify-center items-center max-w-[1200px] min-h-[50vh]">
        {
          loading ? (<Spinner />) : (<Cards category={category} courses={courses} />)
        }
      </div>
      </div>
      
    </div>
    )
};

export default App;
