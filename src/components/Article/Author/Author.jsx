import React from 'react';
const config = require('../../../utils/siteConfig');
import styled, { keyframes } from 'styled-components';
import avatar from './cat.jpeg';

const Wrapper = styled.section`
  border-top: 2px dotted ${props => props.theme.post.colors.authorBorder};
  margin: 3em 0 0;
  padding: 2em 0 0;
`;

const Text = styled.p`
  color: ${props => props.theme.post.colors.author};
  line-height: 1.4;
  margin: 0;
  strong {
    color: ${props => props.theme.post.colors.bold};
  }
`;

const Avatar = styled.img`
  border: 1px solid ${props => props.theme.post.colors.authorBorder};
  border-radius: 100%;
  float: left;
  height: 50px;
  width: 50px;
  margin: -0.5em 1em 0 0;
`;

const Author = () => {
  const content = `<strong>${config.authorName}</strong> ${
    config.authorDescription
  }`;

  return (
    <Wrapper>
      <Avatar src={require("./cat.jpeg")} alt="author" />
      <Text dangerouslySetInnerHTML={{ __html: content }} />
    </Wrapper>
  );
};

export default Author;
