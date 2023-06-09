import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function CustomEditor({ selector, height, initialValue }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
    }
  };
  return (
    <Editor
      apiKey="your-api-key"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={initialValue ?? ""}
      init={{
        selector,
        height: height ?? 150,
        menubar: "file edit view format",
        menu: {
          file: { title: "File", items: "newdocument" },
          edit: {
            title: "Edit",
            items: "undo redo | cut copy paste | selectall",
          },
          view: { title: "View", items: "visualaid" },
          format: {
            title: "Format",
            items:
              "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align | forecolor backcolor | language | removeformat",
          },
        },
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
        ],
        toolbar:
          "undo redo | styles | " +
          "bold italic | alignleft aligncenter " +
          "alignright alignjustify | outdent indent | ",
        content_style:
          "body { font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif; font-size:12px; }",
        // content_css: 'css/content.css'
      }}
    />
  );
}
