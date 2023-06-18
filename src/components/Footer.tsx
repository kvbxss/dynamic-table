import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import heartIcon from '../assets/heart.svg'




const Footer: FunctionComponent = () => {
  return (
    <Foot>
      <Text>
        Developed with 
      </Text>
      <Heart>
        <HeartIcon src={heartIcon}/>
      </Heart>
      <Text>
        by <a href="jakubdownarowicz.pl">Jakub Downarowicz</a>
      </Text>
    </Foot>
  )
}

export default Footer;

const Foot = styled.div`
display: flex;
--tw-text-opacity: 1;
color: rgba(82, 82, 82, var(--tw-text-opacity));
font-family: 'Mukta', sans-serif;
font-size: 1rem;
line-height: 1.25rem;
margin-top: 0.5rem;
`

const Text = styled.p`
font-family: 'Mukta', sans-serif;
font-size: 1rem;
line-height: 1.25rem;


`

const Heart = styled.span`
  padding: 0 0.5rem;
`

const HeartIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-top: 1rem;
`;
