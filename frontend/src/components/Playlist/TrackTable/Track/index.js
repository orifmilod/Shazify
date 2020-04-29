import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Table } from '../../../../styled'

import ConvertMs from '../../../../utils/ConvertMs'
import defaultTrackIcon from '../../../../img/trackIcon.png'
import { setCurrentTrackID } from '../../../../reducers/rootReduce'

const BodyRow = styled(Table.Row)`
  > td {
    font-size: 13px;
  }
  :hover {
    background: #ececec;
    > td > i {
      color: white;
      background: linear-gradient(to left, #ff4b2b, #ff416c);
    }
    > td > img {
      opacity: 0;
    }
  }
  border-bottom: 0.5px lightgray solid;
`

const PlayButton = styled.i`
  position: absolute;
  color: rgba(0, 0, 0, 0);
  font-size: 40px !important;
  top: 10px;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
  padding: 10px;
  height: 60px;
  z-index: 999;
  width: 60px;
  transition: 0.2s ease-in-out;
`

const OverLayImage = styled.img`
  display: block;
  width: 60px;
  border-radius: 50%;
  height: auto;
`

const PlayButtonContainer = styled(Table.Data)`
  width: 75px;
  padding: 10px 0;
`

export default function Track({ track }) {
  const { name, artists, album, id, duration_ms } = track
  const dispatch = useDispatch()

  return (
    <BodyRow key={id} onClick={() => dispatch(setCurrentTrackID(id))}>
      <PlayButtonContainer>
        <PlayButton className="far fa-play-circle fa-2x" />
        <OverLayImage
          src={album.images.length > 0 ? album.images[0].url : defaultTrackIcon}
        />
      </PlayButtonContainer>
      <Table.Data>{name}</Table.Data>
      <Table.Data>{artists.map((artist) => `${artist.name} `)}</Table.Data>
      <Table.Data>{album.name}</Table.Data>
      <Table.Data>{ConvertMs(duration_ms)}</Table.Data>
    </BodyRow>
  )
}
