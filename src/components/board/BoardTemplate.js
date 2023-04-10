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
      }
      & .tox-tinymce{
        border: none!important;
      }
    `
    return (
      <Container>
              <input
        id="my-file"
        type="file"
        name="my-file"
        style={{ display: "none" }}
      />
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
             'insertdatetime media paste code help wordcount textcolor',
             'quickbars',
             'image'
           ],
           quickbars_insert_toolbar: false,
           advlist_bullet_styles: 'square',
           advlist_number_styles: 'lower-alpha',
           toolbar: false,
           quickbars_selection_toolbar: 'alignjustify alignleft aligncenter alignright || forecolor backcolor|| h1 h2 h3 h4 h5 h6 || strikethrough underline redo undo image',
           content_style: "body { font-family:Helvetica,Arial,sans-serif;background-color:rgb(73, 121, 89);color: white; font-size: 2rem;}.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {color: white;opacity: 0.4;} h1,h2,h3,h4,h5,h6,p{margin:0};"
           ,
           placeholder: '내용을 적어주세요',
           automatic_uploads: true,
          file_browser_callback_types: "image",
          image_advtab: true,
          file_picker_callback: function (callback, value, meta) {
            if (meta.filetype === "image") {
              let input = document.getElementById(
                "my-file"
              );
              if (!input) return;
              input.click();
              input.onchange = function () {
                let file = (input)?.files[0];
                let reader = new FileReader();
                reader.onload = function (e) {
                  console.log("name", (e.target).result);
                  callback((e.target).result, {
                    alt: file.name,
                  });
                };
                reader.readAsDataURL(file);
              };
            }
          },
         }}
       />
        {/* <button onClick={log}>Log editor content</button> */}
      </Container>
    );
  }