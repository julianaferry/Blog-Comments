import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { addComment, updateComment} from '../Actions/CommentAction';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../Styles/index.css';

  const FormStyle = styled.form `
    display: flex;
    flex-direction: column;
    background-color:#58F7F2
  `;


  class CommentForm extends Component {
    static propTypes = {
      comment: PropTypes.object,
      post: PropTypes.object,
      addComment: PropTypes.func,
      updateComment: PropTypes.func,
      handleFinishEdit: PropTypes.func
    };
  
    state = {
      author: this.props.comment ? this.props.comment.author : '',
      body: this.props.comment ? this.props.comment.body : ''
    };
  
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value
      });
    };
  
    handleSubmit = event => {
      event.preventDefault();
  
      const {
        comment,
        handleFinishEdit,
        post,
        updateComment,
        addComment
      } = this.props;
  
      if (comment) {
        const updatedComment = {
          ...comment,
          timestamp: Date.now(),
          author: this.state.author,
          body: this.state.body
        };
        updateComment(updatedComment);
        handleFinishEdit();
      } else {
        const newComment = {
          id: v4(),
          parentId: post.id,
          timestamp: Date.now(),
          author: this.state.author,
          body: this.state.body
        };
  
        addComment(newComment);
      }
  
      this.setState({ author: '', body: '' });
    };
  
    render() {
      const { comment, handleFinishEdit } = this.props;
      return (
        <div
          style={{
            paddingLeft: 16
          }}
        >
          <form FormStyle={FormStyle}
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
            onSubmit={event => this.handleSubmit(event)}
            autoComplete="off"
          >
            <TextField
              required
              id="body"
              label="Comment"
              fullWidth
              multiline
              rows="4"
              value={this.state.body}
              onChange={this.handleChange('body')}
              style={{
                maxWidth: 400
              }}
            />
            <TextField
              required
              id="author"
              label="author"
              fullWidth
              value={this.state.author}
              onChange={this.handleChange('author')}
              style={{
                maxWidth: 400,
                paddingTop: 10,
                paddingBottom: 20
              }}
            />
            <Button
              raised
              color="primary"
              style={{
                maxWidth: 400,
                marginBottom: 20
              }}
              type="submit"
            >
              Save
            </Button>
            {comment && (
              <Button
                style={{
                  maxWidth: 400,
                  marginBottom: 20
                }}
                onClick={handleFinishEdit}
              >
                Cancel
              </Button>
            )}
          </form>
        </div>
      );
    }
  }
  
  export default connect(null, { addComment, updateComment })(CommentForm);