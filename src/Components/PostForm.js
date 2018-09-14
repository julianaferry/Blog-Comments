import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { addPost, updatePost } from '../Actions/PostAction';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import  MenuItem  from '@material-ui/core/MenuItem';
import FormControl  from '@material-ui/core/FormControl';
import { Category } from '../Utils/Category';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../Styles/index.css';

const PostStyle = styled.div`
 padding: 44px 5px;  
 background-color:#f5e439;
`;


class PostForm extends Component {
  static propTypes = {
    post: PropTypes.object,
    categories: PropTypes.array,
    addPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired
  };

  state = {
    author: this.props.post ? this.props.post.author : '',
    title: this.props.post ? this.props.post.title : '',
    body: this.props.post ? this.props.post.body : '',
    category: this.props.post ? this.props.post.category : 'react',
    finished: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  redirect = () => this.setState({ finished: true });

  handleSubmit = event => {
    event.preventDefault();

    const { post, addPost, updatePost } = this.props;

    if (post) {
      const updatedPost = {
        ...post,
        timestamp: Date.now(),
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        category: this.state.category
      };
      updatePost(updatedPost);
      
    } else {
      const newPost = {
        id: v4(),
        timestamp: Date.now(),
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        category: this.state.category
      };
      addPost(newPost);
    }
    this.redirect();
  };

  render() {
    const { categories } = this.props;
    const { finished } = this.state;

    if (finished) {
      return <Redirect to={'/'} />;
    }

    return (
      
      <Card>
        <PostStyle>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth:600
            }}
            onSubmit={event => this.handleSubmit(event)}
            autoComplete="off"
          >
            <TextField
              required
              id="title"
              label="Title"
              fullWidth 
              value={this.state.title}
              onChange={this.handleChange('title')}
              style={{
                paddingTop: 10,
                paddingBottom: 20
              }}
            />
            <TextField
              required
              id="body"
              label="Body"
              fullWidth
              multiline
              rows="4"
              value={this.state.body}
              onChange={this.handleChange('body')}
              style={{
                paddingTop: 10,
                paddingBottom: 20
              }}
            />
            <TextField
              required
              id="author"
              label="Author"
              fullWidth
              value={this.state.author}
              onChange={this.handleChange('author')}
              style={{
                paddingTop: 10,
                paddingBottom: 20
              }}
            />
            <FormControl>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange('category')}
                input={<Input id="category" />}
                style={{
                  marginBottom: 20
                }}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((category, i) => (
                    <MenuItem key={i} value={category.path} >
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              raised
              color="primary"
              style={{
                marginBottom: 20,
                backgroundColor:'#d3457c',
                color:'black'}}
              type="submit"
            >
              Save
            </Button>
            <Button
              style={{
                marginBottom: 20
              }}
              onClick={this.redirect}
            >
              Cancel
            </Button>
          </form>
        </PostStyle>
      </Card>
    );
  }
}

function mapStateToProps({ posts, categories }, { match }) {
  return {
    post: posts.filter(post => post.id === match.params.postId)[0],
    categories: categories.filter(
      category => category.path !== Category.path
    )
  };
}

export default connect(mapStateToProps, { addPost, updatePost })(PostForm);


