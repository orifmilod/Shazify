import React, { Component } from "react";
import queryString from "query-string";
import Grid from "../../styled/Grid";
import P from "../../styled/P";
import Input from "../../styled/Input";
import styled from "styled-components";
import { ReactMic } from "react-mic";

import { Search as SearchIcon } from "styled-icons/boxicons-regular";

const SearchIcn = styled(SearchIcon)`
  color: gray;
  right: 150px;
  height: 40px;
  width: 40px;
  position: relative;
  z-index: 3;
  left: 45%;
  bottom: 50%;
`;
const SearchInput = styled(Input)`
  border-radius: 50px;
  height: 80%;
  margin: auto;
  width: 98%;
  border: 1px solid black;
  padding: 30px;
  border: none;
  :focus {
    border: 1px solid orange;
  }
`;

const SearchContainer = styled(Grid)`
  grid-auto-flow: column;
  grid-template-columns: 4fr 1fr;
  box-shadow: 4px 7px 10px 1px rgba(0, 0, 0, 0.75);
  z-index: 2;
`;

const AudioSearch = styled.button`
  height: 80%;
  margin: auto;
  width: 98%;
  border-radius: 50px;
  color: white;
  background: ${props => props.theme.color.greenGradient};
  /* padding: 20px; */
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
  //#region Methods
  getAccessToken = () => {
    const hash = queryString.parse(window.location.hash);
    return hash.access_token;
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getPlayer = event => {
    event.preventDefault();
    const access_token = this.getAccessToken();

    fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };

  toggleRecording = () => {
    const { recording } = this.state;
    this.setState({ recording: !recording });
  };

  onStop = recordedBlob => {
    this.setState({ file: recordedBlob });
    console.log("Making req");
    this.props.audioSearch(recordedBlob);
  };
  //#endregion
  render() {
    const { searchInput, recording } = this.state;
    const { handleSearch } = this.props;

    return (
      <SearchContainer>
        {/* <form onSubmit={e => handleSearch(e, searchInput)}> */}
        <SearchInput
          placeholder="Search track..."
          type="text"
          value={searchInput}
          onChange={this.handleChange}
          name="searchInput"
        />
        {/* <SearchIcn /> */}
        {/* </form> */}
        <AudioSearch onClick={this.toggleRecording}>
          <P color="white" font="xs" my={2}>
            {recording ? "Tap to stop" : "Tap to Shazam"}
          </P>
          <ReactMic
            className="recorder"
            backgroundColor="rgb(255,182,30, 0.3)"
            strokeColor="#003171"
            record={recording}
            onStop={this.onStop}
          />
        </AudioSearch>
      </SearchContainer>
    );
  }
}
export default Search;
