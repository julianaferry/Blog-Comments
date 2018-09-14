import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import  DeleteForever from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { TIME_FORMAT } from '../Utils/Constants';
import VoteScore from './VoteScore';
import ListItem from '@material-ui/core/ListItem';
import  ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import moment from 'moment';

const Content = ({ item }) => (

  <div style={{ paddingLeft: 10 }}>
    <ListItemText
      primary={
        <Link
          to={`/${item.category}/${item.id}`}
          style={{ textDecoration: 'none', color: 'grey' }}
        >
          {item.title}
        </Link>
      }
      secondary={`${moment(item.timestamp).format(
        TIME_FORMAT
      )} - Author: ${item.author} - Comments: ${item.commentCount}`}
    />
  </div>
);

const PostList = ({ items, handleDelete, handleVote }) => {
  return (
    <List>
       
      {items &&
        items.length > 0 &&
        items.map((item, i) => (
          <div key={i}>
            <Card style={{ padding: 5, margin: 75, backgroundColor:'#f5e439', width: '60vw', height: '30vh'}}>
              <ListItem>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: '1 1 auto',
                    margin: '25px 0px',
                  }}
                >
                  <VoteScore item={item} handleVote={handleVote}  />
                  <Content item={item} />
                  <div
                    style={{
                      flex: '1 1 auto'
                    }}
                  />
                  <div>
                    <Link
                      to={`post/edit/${item.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <Edit />
                    </Link>
                    <DeleteForever onClick={() => handleDelete(item)} />
                  </div>
                </div>
              </ListItem>
            </Card>
          </div>
        ))}
       
    </List>
  );
};

Content.propTypes = {
  item: PropTypes.object.isRequired
};

PostList.propTypes = {
  items: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleVote: PropTypes.func.isRequired
};

export default PostList;