import { useEffect, useState } from 'react'
 
function fetchNotes() {

  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("uid");
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://pthwkwbyyxcazmigxpzv.supabase.co/rest/v1/notes?user_id=eq.${uid}`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aHdrd2J5eXhjYXptaWd4cHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMTUxOTEsImV4cCI6MjA2MTU5MTE5MX0.lm80N0lOUI8DzoT5imzkyum2fxeAVMXwYX-AstukqDA",
          },
        }
      );
      const data = await response.json();
      console.log(data[0].title);
      setdata(data);
    };
    fetchData();
  }, []);
  return data;
}

export default fetchNotes
