import React, {useEffect, useState, useRef} from 'react'
import styled from "styled-components";
import { Editor } from '@tinymce/tinymce-react';

export default () => {
    const editorRef = useRef(null);
    // const log = () => {
    //   if (editorRef.current) {
    //     console.log(editorRef.current.getContent());
    //   }
    // };
    return (
      <div>
        <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         apiKey='qw9yikdbp0cjvowgr7fuv36c39o7939ou4d6a818gsi9pj4s'
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{

           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media paste code help wordcount',
             'quickbars'
           ],
           quickbars_insert_toolbar: false,

           advlist_bullet_styles: 'square',
           advlist_number_styles: 'lower-alpha',
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'numlist bullist',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
           
         }}
       />
        {/* <button onClick={log}>Log editor content</button> */}
      </div>
    );
  }