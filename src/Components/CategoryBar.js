import React from 'react';
import  FormControl  from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
//import  Drawer  from '@material-ui/core/Drawer';
//import Toolbar from '@material-ui/core/Toolbar';
//import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import  MenuItem  from '@material-ui/core/MenuItem';
//import Typography from '@material-ui/core/Typography';
import { VOTE_ORDER, TIMESTAMP_ORDER } from '../Utils/Constants';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../Styles/index.css';
import styled from 'styled-components';
//import  ResponsiveDrawer from './Drawer';


const ListStyle = styled.ul`
    display:flex;
    flex-direction:column;
    background-color:#FF9CD3;
    width:10vw;
    min-width:10vw;
`;


const CategoryBar = ({ categories, order, handleOrderChange }) => (
 
      <ListStyle>
        <div>
         <List>
 
          {categories &&
            categories.length > 0 &&
            categories.map((category, i) => (
              <Link
                to={`/${category.path}`}
                key={i}
                style={{ textDecoration: 'none' }}
              >
                <Button color="contrast">{category.name} </Button>
              </Link>
            ))}
          <FormControl>
            <Select
              style={{ color: 'red'}}
              value={order}
              onChange={handleOrderChange}
              input={<Input id="order-tag" />}
            >
              <MenuItem value={VOTE_ORDER}>Vote Score</MenuItem>
              <MenuItem value={TIMESTAMP_ORDER}>Time</MenuItem>
            </Select>
          </FormControl>
        
          </List>
      </div>
      
  </ListStyle>

 
 
 
);

CategoryBar.propTypes = {
  categories: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  handleOrderChange: PropTypes.func.isRequired
};

export default CategoryBar;
