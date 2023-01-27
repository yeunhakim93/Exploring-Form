import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { FontSize } from "../../../../tiptap-extension/font-size";
import { useFormBuilder } from "../../../../redux/slices/formBuilder";

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  HighlightIcon,
  UndoIcon,
  RedoIcon,
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
      <div className="divider"></div>

      <select
        className="dropdown"
        name="fontFamily"
        onChange={(e) => {
          editor.chain().focus().setFontFamily(e.target.value).run();
          console.log(editor.getAttributes("textStyle").fontFamily);
        }}
        value={editor.getAttributes("textStyle").fontFamily || "Figtree"}
      >
        <option value="Figtree">Figtree</option>
        <option value="Roboto">Roboto</option>
        <option value="Quicksand">Quicksand</option>
        <option value="Raleway">Raleway</option>
        <option value="Special Elite">Special Elite</option>
      </select>
      <select
        className="dropdown"
        name="fontSize"
        onChange={(e) => {
          editor.chain().focus().setFontSize(e.target.value).run();
          console.log(editor.getAttributes("textStyle").fontSize);
        }}
        value={editor.getAttributes("textStyle").fontSize || "10px"}
      >
        <option value="10px">10</option>
        <option value="11px">11</option>
        <option value="12px">12</option>
        <option value="14px">14</option>
        <option value="16px">16</option>
        <option value="18px">18</option>
        <option value="20px">20</option>
        <option value="24px">24</option>
        <option value="28px">28</option>
      </select>
      <div className="divider"></div>
      <button
        className={editor.can().undo() ? "" : "un-doable"}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <UndoIcon />
      </button>
      <button
        className={editor.can().redo() ? "" : "un-doable"}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <RedoIcon />
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
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Highlight,
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
    ],
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
      {isEditing && <MenuBar editor={editor} />}
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
