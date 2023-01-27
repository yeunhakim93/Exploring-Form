import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Color } from "@tiptap/extension-color";
import { FontSize } from "./font-size";
import { useFormBuilder } from "../redux/slices/formBuilder";

import "./Buttons.css";
import { TiptapMenuBar } from "./TiptapMenuBar";

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
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Color,
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
      {isEditing && <TiptapMenuBar editor={editor} />}
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
