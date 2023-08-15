import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]); // Daten from the API
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' }); // Sort configuration for the data
  const apiURL = 'https://my-json-server.typicode.com/typicode/demo/posts'; // URL for the API

  // Sort status of the column
  const [sortStatus, setSortStatus] = useState({
    id: 'none',
    title: 'none'
  });

  // Sorting function
  const sortData = (key, direction) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1; //Return -1 for asc | Return 1 for desc
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1; //Return -1 for asc | Return 1 for desc
      }
      return 0; //Values are equal
    });
    setData(sorted);
  };

  // Fetch the data from the API on initial load of the application
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Use the fetch function to make a GET request to the API URL
        const response = await fetch(apiURL);
        //Parse the response into a JSON and save it in jsonData
        const jsonData = await response.json();
        //Update the component's data state
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    //Initiate the data retrieval
    fetchData();
  }, []);

  // Call the sort function when sortConfig changes
  useEffect(() => {
    sortData(sortConfig.key, sortConfig.direction);
  }, [sortConfig]);

  // Update the sort status
  useEffect(() => {
    const newSortStatus = {
      id: 'none',
      title: 'none'
    };
    //Update the sort status object based on the current sort configuration
    newSortStatus[sortConfig.key] = sortConfig.direction;
    setSortStatus(newSortStatus);
  }, [sortConfig]);

  return (
    <div className="App">
    <h1>Data Display App</h1>
    <table>
      <thead>
        <tr>
          <th className="th-id" onClick={() => setSortConfig({ key: 'id', direction: sortConfig.key === 'id' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
            ID {sortStatus.id === 'asc' && <span>&uarr;</span>}
            {sortStatus.id === 'desc' && <span>&darr;</span>}
          </th>
          <th className="th-title" onClick={() => setSortConfig({ key: 'title', direction: sortConfig.key === 'title' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
            Title {sortStatus.title === 'asc' && <span>&uarr;</span>}
            {sortStatus.title === 'desc' && <span>&darr;</span>}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default App;
