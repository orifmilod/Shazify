import React, { Component } from "react";
import Grid from "../../styled/Grid";
import Input from "../../styled/Input";
import P from "../../styled/P";
import styled from "styled-components";
import { ReactMic } from "react-mic";
import { Search as SearchIcon } from "styled-icons/boxicons-regular";
import shazamIcon from "../../img/shazam.png";
import "../../shockwave.css";

const SearchIcn = styled(SearchIcon)`
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
class Search extends Component {
  state = {
    searchInput: "",
    recording: false,
    file: {}
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  toggleRecording = e => {
    e.currentTarget.classList.toggle("is-active");
    const { recording } = this.state;
    this.setState({ recording: !recording });
  };

  onStop = recordedBlob => {
    this.setState({ file: recordedBlob });
    this.props.audioSearch(recordedBlob);
  };
  render() {
    const { searchInput, recording } = this.state;
    const { handleSearch } = this.props;

    return (
      <SearchContainer>
        <form onSubmit={e => handleSearch(e, searchInput)}>
          <SearchInput
            placeholder="Search track..."
            type="text"
            value={searchInput}
            onChange={this.handleChange}
            name="searchInput"
          />
          <SearchIcn />
        </form>
        <Grid class="btn-container" direction="column">
          <button class="btn btn--shockwave" onClick={this.toggleRecording}>
            <img src={shazamIcon} height="50px" width="50px" alt="shazamIcon" />
          </button>
          <TextSlide>{recording ? "Tap to search" : "Tap to shazam"}</TextSlide>
          <AudioSearch>
            <ReactMic
              className="recorder"
              backgroundColor="rgb(255,182,30, 0.4)"
              strokeColor="#003171"
              record={recording}
              onStop={this.onStop}
            />
          </AudioSearch>
        </Grid>
      </SearchContainer>
    );
  }
}
export default Search;
