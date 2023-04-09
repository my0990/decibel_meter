import React, {useEffect, useState, useRef} from 'react'
import styled from "styled-components";
import { Editor } from '@tinymce/tinymce-react';

export default () => {
    const editorRef = useRef(null);
    
    const Container = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: red;

      div{
        margin: 2em;
        width: 100%;


      }
    `
    return (
      <Container>
        <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         apiKey={process.env.REACT_APP_TINYMCE_KEY}
         init={{
           statusbar: false,
           height: '95%',
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
           content_style: 'body { font-family:Helvetica,Arial,sans-serif;background-color:gray;color: white; font-size: 2rem; }'
+
           `.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
              color: white;
              opacity: 0.4;
              position: absolute;
              top: 2rem;
           }
           `,
          //  placeholder: '내용을 적어주세요'
         }}
       />
        {/* <button onClick={log}>Log editor content</button> */}
      </Container>
    );
  }