import React from "react";

import {
  LeftAlignIcon,
  MiddleAlignIcon,
  RightAlignIcon,
  OrderedListIcon,
  BulletListIcon,
} from "./Buttons";
import "./Buttons.css";

type TiptapTextMenuBarProps = {
  editor: any;
};

export const TiptapTextMenuBar: React.FC<TiptapTextMenuBarProps> = ({
  editor,
}) => {
  return (
    <div className="tiptap-text-menu" style={{}}>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <LeftAlignIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <MiddleAlignIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <RightAlignIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <BulletListIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <OrderedListIcon />
      </button>
    </div>
  );
};
