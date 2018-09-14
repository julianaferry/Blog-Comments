import React from 'react';
import List  from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
import ListItemText  from '@material-ui/core/ListItemText';
import  Edit from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import  '../Styles/index.css';
import { TIME_FORMAT } from '../Utils/Constants';
import VoteScore from './VoteScore';
import Card from '@material-ui/core/Card';
import CommentForm from './CommentForm';
import PropTypes from 'prop-types';
import moment from 'moment';

const Content = ({ item }) => (
  <div style={{ paddingLeft: 10 }}>
    <ListItemText
      primary={item.body}
      secondary={`${moment(item.timestamp).format(
        TIME_FORMAT
      )} - Author: ${item.author}`}
    />
  </div>
);

const CommentList = ({
  items,
  handleDelete,
  handleVote,
  editComment,
  handleEditButton,
  handleFinishEdit
}) => {
  return (
    <List>
      {items &&
        items.length > 0 &&
        items.map((item, i) => (
          <div key={i}>
            <Card style={{ padding: 5, margin: 75, backgroundColor: '#f5e439', boxShadow:'transparent'}}>
              {!(editComment && editComment.id === item.id) && (
                <ListItem>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flex: '1 1 auto'
                    }}
                  >
                    <VoteScore item={item} handleVote={handleVote} />
                    <Content item={item} />
                    <div
                      style={{
                        flex: '1 1 auto'
                      }}
                    />
                    <div style={{margin:'20px 0px'}}>
                      <Edit onClick={() => handleEditButton(item)} />
                      <DeleteForever onClick={() => handleDelete(item)} />
                    </div>
                  </div>
                </ListItem>
              )}
              {editComment &&
                editComment.id === item.id && (
                  <CommentForm
                    comment={item}
                    handleFinishEdit={handleFinishEdit}
                  />
                )}
            </Card>
          </div>
        ))}
    </List>
  );
};

Content.propTypes = {
  item: PropTypes.object.isRequired
};

CommentList.propTypes = {
  items: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleVote: PropTypes.func.isRequired,
  editComment: PropTypes.bool,
  handleEditButton: PropTypes.func.isRequired,
  handleFinishEdit: PropTypes.func.isRequired
};

export default CommentList;