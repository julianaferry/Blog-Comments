import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { UP_VOTE, DOWN_VOTE } from '../Utils/Constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';



const VoteStyle = styled.div`
    text-align: center;
    background-color:aqua;
    font-size:30px;
    border-radius:30px;
    
`;


const VoteScore = ({ item, handleVote }) => (
  <div>
    <ThumbUpIcon onClick={() => handleVote(item, UP_VOTE)}/>
      <VoteStyle>{item.voteScore}</VoteStyle>

    <ThumbDownIcon onClick={() => handleVote(item, DOWN_VOTE)}/>
  </div>
);

VoteScore.propTypes = {
  item: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired
};

export default VoteScore;