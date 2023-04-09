import React, {useEffect, useState, useRef} from 'react'
import styled from "styled-components";
import { Editor } from '@tinymce/tinymce-react';

export default () => {
    const editorRef = useRef(null);
    
    const Container = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;


      div{
        
        width: 100%;
      }
      & .tox-edit-area__iframe{
        background-color: #274c43 !important;
        border: 10px solid rgb(183, 130, 64) !important; 
        p {
          margin: 0 !important;
        }
      }
      & .tox-tinymce{
        border: none!important;
      }
    `
    return (
      <Container>
        <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         apiKey={process.env.REACT_APP_TINYMCE_KEY}
         init={{
           statusbar: false,
           height: '100%',
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media paste code help wordcount',
             'quickbars',
             'image'
           ],
           quickbars_insert_toolbar: false,
           advlist_bullet_styles: 'square',
           advlist_number_styles: 'lower-alpha',
           toolbar: false,
           quickbars_selection_toolbar: 'h1 h2 h3 h4 h5 h6 blockquote',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif;background-color:rgb(73, 121, 89);color: white; font-size: 2rem;}'
+
           `.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
              color: white;
              opacity: 0.4;

           }
           `,
           placeholder: '내용을 적어주세요'
         }}
       />
        {/* <button onClick={log}>Log editor content</button> */}
      </Container>
    );
  }