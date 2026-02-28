import Header from "./components/Header";
import JobCard from "./components/JobCard";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Skeleton from "./services/skeleton";
import { useEffect, useState } from "react";
import { collection,query,getDocs,orderBy,where } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async() => {
    try {
      setLoading(true);
      setCustomSearch(false);

      const q = query(
        collection(db, "jobs"),
        orderBy("postedOn", "desc")
      );

      const snap = await getDocs(q);

      const tempJobs = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJobs(tempJobs);
    } catch (error) {
      console.error("Fetch Jobs Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsCustom = async (jobCriteria) => {
    try {
      setLoading(true);
      setCustomSearch(true);

      let constraints = [];

      if (jobCriteria.title)
        constraints.push(where("title", "==", jobCriteria.title));

      if (jobCriteria.type)
        constraints.push(where("type", "==", jobCriteria.type));

      if (jobCriteria.experience)
        constraints.push(where("experience", "==", jobCriteria.experience));

      if (jobCriteria.location)
        constraints.push(where("location", "==", jobCriteria.location));

      constraints.push(orderBy("postedOn", "desc"));

      const q = query(collection(db, "jobs"), ...constraints);
      const snap = await getDocs(q);

      const tempJobs = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJobs(tempJobs);
    } catch (error) {
      console.error("Custom Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />

      <SearchBar fetchJobsCustom={fetchJobsCustom} />

      {customSearch && (
        <div className="flex justify-end mb-2 px-10">
          <button
            onClick={fetchJobs}
            className="bg-blue-500 px-6 py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition"
          >
            Clear Filters
          </button>
        </div>
      )}

      {loading &&
     Array.from({ length: 5 }).map((_, index) => (
     <Skeleton key={index} />
    ))}

     {!loading && jobs.length === 0 && (
     <p className="text-center font-semibold mt-6">
       No jobs found
    </p>
   )}

    {!loading &&
     jobs.map((job) => (
     <JobCard key={job.id} {...job} />
   ))}
    </div>
  );
}
export default App