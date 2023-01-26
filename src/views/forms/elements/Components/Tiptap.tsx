import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { useFormBuilder } from "../../../../redux/slices/formBuilder";

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  HighlightIcon,
  UndoIcon,
  MoreIcon,
  DropDownIcon,
} from "./Buttons";
import "./Buttons.css";

type MenuBarProps = {
  editor: any;
};

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-menu" style={{}}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <BoldIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <UnderlineIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "is-active" : ""}
      >
        <HighlightIcon />
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        <UndoIcon />
      </button>
    </div>
  );
};

type TiptapProps = {
  id: string;
  content: string;
  isActive: boolean;
  handleTiptapDeactivate: (e: React.FocusEvent<HTMLDivElement>) => void;
  handleSetElementBody?: (newBody: string) => void;
};

export const Tiptap: React.FC<TiptapProps> = ({
  content,
  id,
  isActive,
  handleTiptapDeactivate,
  handleSetElementBody,
}) => {
  const { dispatchUpdateFormElementBody } = useFormBuilder();

  const [isEditing, setIsEditing] = useState(false);
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Underline],
    content,
  });

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event?.currentTarget.contains(event.relatedTarget) && isEditing) {
      setIsEditing(false);
      // deselect selected text in tiptap
      document?.getSelection()?.removeAllRanges();
    }
    dispatchUpdateFormElementBody({
      formElementId: id,
      body: editor?.getHTML() || "",
    });
    handleTiptapDeactivate(event);
    handleSetElementBody && handleSetElementBody(editor?.getHTML() || "");
  };

  return (
    <div
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        handleBlur(e);
      }}
    >
      {(isEditing || isActive) && <MenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        onClick={() => {
          if (!isEditing) setIsEditing(true);
        }}
        onDoubleClick={() => {
          if (!isEditing) setIsEditing(true);
        }}
      />
    </div>
  );
};
