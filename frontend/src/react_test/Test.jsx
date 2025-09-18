import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";



const test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/data/")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Data from Django</h1>
      {data.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
          <p>Number: {item.number}</p>
          {/* {item.image ? (
            <img
              src={`http://127.0.0.1:8000/media/${item.image}`}
              alt="Uploaded"
              width="150"
            />
          ) : (
            <p>No image uploaded</p>
          )} */}
          {item.image ? (
            <img src={item.image} width="150px" alt="user" />
          ) : (
            <p>No image uploaded</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default test
