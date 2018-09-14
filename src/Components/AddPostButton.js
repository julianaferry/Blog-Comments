import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

 
const ButtonCircle= styled.button `
        position: fixed;
        right: 25px;
        bottom: 25px;
        width: 50px;
        height: 50px;
        background-color: yellow!important;      
        color: black;
        border: 2px solid yellow;
        border-radius: 26px;
      `;

const AddPostButton = () => {

    return (
        <div>
          <Link to={`/post/new`} style={{ textDecoration: 'none' }}>
            <ButtonCircle>
              <AddIcon />
            </ButtonCircle>
          </Link>
       </div>
      )
  };
      
export default AddPostButton;