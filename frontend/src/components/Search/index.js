import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { toast } from 'react-toastify';
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import { Grid, Input, P } from "../../styled";
import shazamIcon from "../../img/shazam.png";

import "../../shockwave.css";

const SearchIcon = styled.i`
  color: black;
  right: 150px;
  height: 20px;
  width: 20px;
  position: absolute;
  z-index: 3;
  left: 20px;
  top: 17px;
`;

const TextSlide = styled(P)`
  background: #47a8e6;
  border-radius: 15px;
  width: 100px;
  height: 30px;
  padding: 5px 0;
  color: white;
  font-size: 12px;
  transition: 1s ease-in-out;
`;

const SearchInput = styled(Input)`
  font-size: 14px;
  border-radius: 50px;
  height: 80%;
  margin: 7px;
  width: 98%;
  padding: 5px 35px;
  border: 0.5px lightgray solid;
`;

const SearchContainer = styled(Grid)`
  grid-auto-flow: column;
  grid-template-columns: 300px 50px;
  grid-gap: 20px;
  box-shadow: 9px 2px 10px 1px rgba(0, 0, 0, 0.75);
  z-index: 2;
`;

const AudioSearch = styled.button`
  height: 80%;
  margin: auto;
  width: 98%;
  border-radius: 50px;
  color: white;
  background: ${props => props.theme.color.greenGradient};
  border: none;
  :focus {
    outline-width: 0;
  }
`;

function Search({ history }) {

  const [file, setFile] = useState(undefined);
  const [searchInput, setSearchInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  function handleSearch(e, searchFilter) {
    if (e.preventDefault !== undefined) e.preventDefault();
    if (!searchFilter.trim()) {
      toast.error('Search something!');
      return;
    }
    const URIEconded = encodeURI(searchFilter);
    history.push(`/home/search/${URIEconded}`);
  }

  // state = {
  //   searchInput: "",
  //   recording: false,
  //   file: {}
  // };

  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  // toggleRecording = e => {
  //   e.currentTarget.classList.toggle("is-active");
  //   const { recording } = this.state;
  //   this.setState({ recording: !recording });
  // };

  function onStop(recordedBlob) {
    setFile(recordedBlob);
    // this.props.audioSearch(recordedBlob);
  };

  return (
    <SearchContainer>
      <form onSubmit={e => handleSearch(e, searchInput)}>
        <SearchInput
          type="text"
          name="searchInput"
          value={searchInput}
          placeholder="Search track..."
          onChange={(e) => setSearchInput(e.currentTarget.value)}
        />
        <SearchIcon className='fas fa-search' />
      </form>

      <Grid class="btn-container" direction="column">
        <button class="btn btn--shockwave" onClick={() => setIsRecording(false)}>
          <img src={shazamIcon} height="50px" width="50px" alt="shazamIcon" />
        </button>
        <TextSlide>{isRecording ? "Tap to search" : "Tap to shazam"}</TextSlide>
        <AudioSearch>
          <ReactMic
            onStop={onStop}
            record={isRecording}
            className="recorder"
            strokeColor="#003171"
            backgroundColor="rgb(255,182,30, 0.4)"
          />
        </AudioSearch>
      </Grid>
    </SearchContainer>
  );
}

export default withRouter(Search);