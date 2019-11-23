import React from 'react'
import Map from '../Map'
import Page from '../Page'
import InfoContainer from '../InfoContainer'
import CommunityPost from '../CommunityPost'
import styled from 'styled-components'


const CommunityHeader = styled.span`
  font-size: 1.5em;
  padding: 1em 0.5em 1em 0.5em; 
`

const CommunityView = ({ navigation }) => {
  const points = [{lat: 60.278168, lng: 24.596941, text: 'Muinaisluola'}, {lat: 60.275972, lng:24.597269, text: 'Hieno kivi'}, {lat:60.277539, lng:24.602004, text:'Hieno kuusi'}]
  return (
    <Page>
      <Map points={points}/>
      <InfoContainer minHeight={300}>
        <CommunityHeader>Happening near you</CommunityHeader>
        <div style={{overflowY: 'auto'}}>
          <CommunityPost/>
          <CommunityPost/>
          <CommunityPost/>
          <CommunityPost/>
          <CommunityPost/>
          <CommunityPost/>
          <CommunityPost/>
          <CommunityPost/>
        </div>
      </InfoContainer>
    </Page>
  )
}

export default CommunityView
