import React, { Component } from "react";
import GetAccessToken from "../../utils/GetAccessToken";
import Grid from "../../styled/Grid";
import Input from "../../styled/Input";
import styled from "styled-components";
import { ReactMic } from "react-mic";

import { Search as SearchIcon } from "styled-icons/boxicons-regular";
import { toast } from "react-toastify";

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
  //#region Methods
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getPlayer = async event => {
    event.preventDefault();
    try {
      const access_token = GetAccessToken();
      const response = await fetch("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const data = response.json();
      console.log(data);
    } catch (error) {
      toast.error("Get Player Error");
    }
  };

  toggleRecording = () => {
    const { recording } = this.state;
    this.setState({ recording: !recording });
  };

  onStop = recordedBlob => {
    this.setState({ file: recordedBlob });
    this.props.audioSearch(recordedBlob);
  };
  //#endregion
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
        <AudioSearch onClick={this.toggleRecording}>
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
