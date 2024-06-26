import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        // className={editor.isActive("bold") ? "is-active" : ""}
        className={`${
          editor?.isActive("bold") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        bold
      </button>
      <button
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        italic
      </button>
      <button
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        className={`${
          editor?.isActive("strike") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        strike
      </button>
      <button
        onClick={() => editor?.chain().focus().toggleCode().run()}
        disabled={!editor?.can().chain().focus().toggleCode().run()}
        className={`${
          editor?.isActive("code") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        code
      </button>
      <button
        onClick={() => editor?.chain().focus().unsetAllMarks().run()}
        className={`${
          editor?.isActive("code") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        clear marks
      </button>
      <button
        onClick={() => editor?.chain().focus().clearNodes().run()}
        className={`${
          editor?.isActive("code") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${
          editor.isActive("codeBlock") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive("blockquote") ? "bg-black text-white" : ""
        } border border-black p-1`}
      >
        blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`border border-black p-1`}
      >
        horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={`border border-black p-1`}
      >
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`border border-black p-1`}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`border border-black p-1`}
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#FF333F").run()}
        className={`${
          editor.isActive("textStyle", { color: "#FF333F" }) ? "is-active" : ""
        } border border-black p-1`}
      >
        Red
      </button>
    </div>
  );
};

const extensions = [
  Color?.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle?.configure({ types: [ListItem.name] } as any),
  StarterKit?.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default (setText) => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      onUpdate={setText}
    ></EditorProvider>
  );
};
