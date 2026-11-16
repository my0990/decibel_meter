import React, {useMemo} from 'react'
import styled from "styled-components";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import cursor from './cursor.svg';


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: [ 'huge', 'large',false, 'small'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
      },
    };
  }, []);
  const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
  ];
    const Container = styled.div`



      
      display: flex;
      justify-content: center;
      overflow:hidden;
      position: relative;
    .ql-toolbar.ql-snow {
      cursor: default;
      position: fixed;
      background-color: white;
      top: 0;


    }
      .ql-toolbar {
      z-index: 100;}

      .quill {
        height: 100vh;
        overflow: hidden;

 }
    .ql-editor {
      padding-top: 42px;
      // display: inline-block;
      color: white;
      background-color: #264941;
      p {
        font-size: 4rem;
        cursor: url(${cursor}) 12 12, auto;
      }
      h1 {
        font-size: 10rem;
        cursor: url(${cursor}) 12 12, auto;
      }
      h2 {
        font-size: 8rem;
        cursor: url(${cursor}) 12 12, auto;
      }
      h3 {
        font-size:6rem;
        cursor: url(${cursor}) 12 12, auto;
      }
      ol {
        font-size: 4rem;
        padding-left: 0.5rem;
        cursor: url(${cursor}) 12 12, auto;
      }
      ul {
        font-size: 4rem;
        padding-left: 0.5rem;
        cursor: url(${cursor}) 12 12, auto;
      }
    }
      div{
        width: 100%;
      }
      &:hover {


      }
      // pointer-events: none;
      cursor: url(${cursor}) 12 12, auto;
    `


    return (
      <Container > 
        <ReactQuill 
              theme="snow"
              modules={modules}
              formats={formats}
              />
      </Container>
    );
        }