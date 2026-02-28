import Header from "./components/Header"
import JobCard from "./components/JobCard"
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import { useEffect, useState } from "react"
import { collection, query, getDocs, orderBy, where} from "firebase/firestore"
import {db} from "./firebase.config.js"

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async() => {
    setCustomSearch(false);
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const req = await getDocs(q);
    req.forEach((job) => {
      //doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
      })
    });
    setJobs(tempJobs);
  }

  const fetchJobsCustom = async(jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, where("type", "==", jobCriteria.type), where("title", "==", jobCriteria.title), where("experience", "==", jobCriteria.experience), where("location", "==", jobCriteria.location), orderBy("postedOn", "desc"));
    const req = await getDocs(q);
    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
      })
    });
    setJobs(tempJobs);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

return (
    <div>
    <Navbar />
    <Header />
    <SearchBar fetchJobsCustom={fetchJobsCustom}/>
  {
    customSearch && 
  <div className="flex justify-end mb-2">
    <button
      onClick={fetchJobs}
      className="flex items-center gap-2 bg-blue-500 px-6 py-2 rounded-md text-white"
    >
      Clear Filters
    </button>
  </div>
  }
    {jobs.map((job) => (
      <JobCard key={job.id} {...job} />
    ))}
    </div>
  )
}
export default App
