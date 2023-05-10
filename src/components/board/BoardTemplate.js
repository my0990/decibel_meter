import React, {useEffect, useState, useRef} from 'react'
import styled from "styled-components";
import { Editor } from '@tinymce/tinymce-react';
import bell from "../../audios/bell.wav";


// eslint-disable-next-line import/no-anonymous-default-export
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
        border: none !important;
      }
    `

    const audio = new Audio(bell);
    audio.volume = 1;

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
         apiKey='qw9yikdbp0cjvowgr7fuv36c39o7939ou4d6a818gsi9pj4s'
         init={{
           statusbar: false,
           height: '100%',
           menubar: false,
           contextmenu: ' bell | quickimage',
           setup: function(editor) {
            editor.ui.registry.addContextMenu('quickimage', {
            update: function(element) {
              return ['image'];
            },
            
            });
            editor.ui.registry.addMenuItem('bell', {
              icon: 'emoji',
              text: 'bell',
              context: 'tools',
              onAction: function () {
                  audio.play();
              }
          });
          },
          plugins: [
            "textpattern", "image", "quickbars","contextmenu"
        ],
        text_patterns: [
         
        ],
           quickbars_insert_toolbar: false,
           toolbar: false,
           quickbars_selection_toolbar: 'forecolor backcolor|| h1 h2 h3 h4 h5 h6 || alignjustify alignleft aligncenter alignright  ||  strikethrough underline redo undo',
           content_style: "body { margin: 1rem; font-family:Helvetica,Arial,sans-serif;background-color:rgb(73, 121, 89);color: white; font-size: 3.5rem;}.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {color: white;opacity: 0.4;} h1,h2,h3,h4,h5,h6,p{margin:0} .mce-content-body ol{margin:0 3rem;};"
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