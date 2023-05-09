import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { API_BASE_URL } from './config';
import './App.css';

function App() {
  const [artists, setArtists] = useState([]);
  const [sortBy, setSortBy] = useState('artist');
  const [sortOrder, setSortOrder] = useState(1);
  const [filterBy, setFilterBy] = useState('');
  const [displayCount, setDisplayCount] = useState(15);

  // Function to fetch data from database and display on front-end
  const loadArtists = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/artists`, {
        method: 'GET',
      });
      const data = await response.json();
      setArtists(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    loadArtists();
  }, []);

  // Function to load more records when the "Load More" button is clicked
  const handleLoadMore = () => {
    setDisplayCount(displayCount + 15);
  };
  
  // Function to sort the selected columns
  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 1 ? -1 : 1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }

    // Logic to sort artists
    setArtists((prevArtists) => {
      return prevArtists.sort((a, b) => {
        if (column === 'artist') {
          const nameA = a[column].toUpperCase();
          const nameB = b[column].toUpperCase();
          if (nameA < nameB) {
            return -1 * sortOrder;
          }
          if (nameA > nameB) {
            return 1 * sortOrder;
          }
          return 0;
        } else {
          return (a[column] - b[column]) * sortOrder;
        }
      });
    });
  };
  
  // Function to filter the data as per entered artist name
  const handleFilter = (event) => {
    setFilterBy(event.target.value);
  };
  
  // Function to handle payout completion and save it in database
  const handleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/artists/${id}`, { completed });
      const updatedArtist = response.data;
      const updatedArtists = artists.map(artist => artist._id === updatedArtist._id ? updatedArtist : artist);
      setArtists(updatedArtists);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={{textAlign: "center"}}>
      <h1>Streaming Royalties Calculator</h1>
      <h5><small className="text-muted">Take a look at the streaming royalties for your artist roster</small></h5>
      <br/>
      <Form>
        <Form.Group controlId="filter">
          <Form.Control type="text" placeholder="Artist's name" value={filterBy} onChange={handleFilter} />
          <Form.Text>Enter artist's name to filter the list</Form.Text>
        </Form.Group>
      </Form>
      <br/>
      <h6><small className="text-muted">This is an unsorted list of artists. Click on the column headers 'Artist', 'Rate', 'Streams' or 'Payout' to activate sorting.</small></h6>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('artist')}>Artist {sortBy === 'artist' ? (sortOrder === 1 ? '▼' : '▲') : ''}</th>
            <th onClick={() => handleSort('rate')}>Rate/stream {sortBy === 'rate' ? (sortOrder === 1 ? '▼' : '▲') : ''}</th>
            <th onClick={() => handleSort('streams')}>Streams {sortBy === 'streams' ? (sortOrder === 1 ? '▼' : '▲') : ''}</th>
            <th onClick={() => handleSort('payout')}>Payout {sortBy === 'payout' ? (sortOrder === 1 ? '▼' : '▲') : ''}</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {artists
            .filter(artist => artist.artist.toLowerCase().includes(filterBy.toLowerCase()))
            .sort((a, b) => sortOrder * (a[sortBy] - b[sortBy]))
            .slice(0, displayCount) // Slicing to only show 15 records at page load
            .map(artist => (
              <tr key={artist._id}>
                <td>{artist.artist}</td>
                <td>{artist.rate}</td>
                <td>{artist.streams}</td>
                <td>{artist.payout}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={artist.completed}
                    onChange={(event) => handleComplete(artist._id, event.target.checked)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {artists.length > displayCount && <Button variant="outline-secondary" onClick={handleLoadMore}>Load More</Button>}
      <div className="footer">
          This web app calculates streaming royalties for given roster of artists as per <a href="https://github.com/rebeldotcom/roster-challenge" target="_blank" rel="noreferrer">this</a> challenge.
          <br />
        <p align="middle">Coded by: <a href="https://www.linkedin.com/in/mandeepkundal/" target="_blank" rel="noreferrer" className="myName"><i>Mandeep Kundal</i></a></p>
      </div>
    </Container>
  );
}

export default App;