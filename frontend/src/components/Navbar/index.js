import React, { useState } from 'react'
import { ReactMic } from 'react-mic'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { Grid, Input, P } from '../../styled'
import shazamIcon from '../../img/shazam.png'
import { audioSearch } from '../../api/shazam'
import '../../shockwave.css'

const SearchIcon = styled.i`
  color: black;
  right: 150px;
  height: 20px;
  width: 20px;
  position: absolute;
  z-index: 3;
  left: 20px;
  top: 17px;
`

const TextSlide = styled(P)`
  background: #47a8e6;
  border-radius: 15px;
  width: max-content;
  height: 30px;
  padding: 5px 10px;
  margin-left: 5px;
  color: white;
  font-size: 12px;
  transition: 1s ease-in-out;
`

const SearchInput = styled(Input)`
  font-size: 14px;
  border-radius: 50px;
  height: 80%;
  margin: 7px;
  width: 98%;
  padding: 5px 35px;
  border: 0.5px lightgray solid;
`

const SearchContainer = styled(Grid)`
  grid-auto-flow: column;
  grid-template-columns: 300px 50px;
  grid-gap: 20px;
  box-shadow: 9px 2px 10px 1px rgba(0, 0, 0, 0.75);
  z-index: 2;
`

const AudioSearch = styled.button`
  height: 80%;
  margin: auto;
  width: 98%;
  border-radius: 50px;
  color: white;
  background: ${(props) => props.theme.color.greenGradient};
  border: none;
  :focus {
    outline-width: 0;
  }
`

function Search({ history }) {
  const [searchInput, setSearchInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  function handleSearch(event, searchFilter) {
    if (event) event.preventDefault()

    if (!searchFilter.trim()) {
      toast.error('Enter keywords to search!')
      return
    }
    const URIEconded = encodeURI(searchFilter)
    history.push(`/home/search/${URIEconded}`)
  }

  async function onStop(recordedBlob) {
    try {
      const result = await audioSearch(recordedBlob)
      const { artists, trackName } = result
      const search = artists + ' ' + trackName
      setSearchInput(search)
      handleSearch(null, search)
    } catch (error) {
      toast.error("Sorry, we couldn't find the music, please try again!")
    }
  }

  function toggleRecording(e) {
    e.currentTarget.classList.toggle('is-active')
    setIsRecording(!isRecording)
  }

  return (
    <SearchContainer>
      <form onSubmit={(e) => handleSearch(e, searchInput)}>
        <SearchInput
          type="text"
          name="searchInput"
          value={searchInput}
          placeholder="Search track..."
          onChange={(e) => setSearchInput(e.currentTarget.value)}
        />
        <SearchIcon className="fas fa-search" />
      </form>

      <Grid class="btn-container" direction="column">
        <button class="btn btn--shockwave" onClick={toggleRecording}>
          <img src={shazamIcon} height="50px" width="50px" alt="shazamIcon" />
        </button>
        <TextSlide>
          {!isRecording ? 'Tap to listen' : 'Tap again to start the search'}
        </TextSlide>
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
  )
}

export default withRouter(Search)
