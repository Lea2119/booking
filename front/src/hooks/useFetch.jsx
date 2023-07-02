import { useState, useEffect } from "react";
import axios from "axios";

  // The useFetch hook takes a url parameter representing the endpoint from which data needs to be fetched. 
  // It returns an object containing data, loading, error, and reFetch variables.


const useFetch = (url) => {

// 1. Defining state variables using the useState hook:

  const [data, setData] = useState([]);    // data is initialized as an empty array using useState([]). It will store the fetched data.
  const [loading, setLoading] = useState(false);  // loading is initialized as false. It will be used to track whether data is currently being fetched or not.
  const [error, setError] = useState(false); // error is initialized as false. It will be used to track any errors that occur during the data fetching process.

  axios.defaults.withCredentials = true ; 
  
// 2. The useEffect hook is used to perform side effects, such as fetching data, in a React component.

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);             // the loading state is set to true to indicate that data fetching is in progress.
      try {
        const res = await axios.get(url); // Then, an HTTP GET request is made using axios.get to the specified url.
        setData(res.data); // If the request is successful, the received response data is stored in the data state using setData.
      } catch (err) {      
        setError(err);     // If there is an error during the request, the error object is stored in the error state using setError.
      }
      setLoading(false); // Finally, the loading state is set back to false to indicate that data fetching is complete.
    };
    fetchData(); 
  }, [url]); // The callback function inside useEffect is executed when the component mounts and whenever the dependencies in the array change.

  // 3. Defining the reFetch function

  // The reFetch function is defined separately from the useEffect callback.
  // It performs the same data fetching logic as the fetchData function defined in the useEffect.
  // The purpose of reFetch is to allow manual triggering of data fetching when needed.

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  return { data, loading, error, reFetch };
};
  
export default useFetch;
