import * as React from 'react';
import { styled } from 'styled-components';


const Dropdown = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Drop>
        <Wrapper>
      <Button onClick={handleOpen}>Select Category ⭏</Button>
      {open ? (
        <List>
          <El>
            <Sp>Menu 1</Sp>
          </El>
          <El >
            <Sp>Menu 2</Sp>
          </El>
        </List>
      ) : null}
      </Wrapper>
    </Drop>
  );
};

export default Dropdown;

const Drop = styled.div`
position: relative;
`

const Wrapper = styled.div`
display: inline-flex;
rounded: 5px;
`

const Button = styled.button`
height: 50px;
display: inline-flex;
background: #fff;
min-width: 150px;
align-items: center;
justify-content: center;
font-family: 'Mukta', sans-serif;
font-size: 1rem;
font-weight: 700;
white-space: nowrap;
color: #F476C3;
border-radius: 5px;
border: 1px solid #F476C3;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 167ms;
&:hover {
  color: #000;
}

`

const List = styled.ul`
position: absolute;
list-style: none;
padding: 0;
margin: 60px 0;
width: 150px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const El = styled.li`
  margin: 0;
  background: #fff;
 align-items: center;
  justify-content: center;
`

const Sp = styled.span`
  display: block;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-family: 'Mukta', sans-serif;
  cursor: pointer;
  &:hover {
    background: #F1F1F1;
  }

`