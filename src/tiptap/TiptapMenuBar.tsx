import React, { useState } from "react";
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
import { TiptapPresetBar } from "./TiptapPresetBar";
import { TiptapTextMenuBar } from "./TiptapTextmenuBar";
const BrandPreset = require("./BrandPreset2.json");

const fonts = [
  "Figtree",
  "Caveat",
  "Explora",
  "Quicksand",
  "Raleway",
  "Roboto",
  "Special Elite",
];

const fontSizes = [
  10, 11, 12, 14, 16, 18, 20, 24, 28, 30, 35, 40, 45, 50, 60, 72, 84, 96, 108,
];

type TiptapMenuBarProps = {
  editor: any;
};

export const TiptapMenuBar: React.FC<TiptapMenuBarProps> = ({ editor }) => {
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const [isTextMenuOpen, setIsTextMenuOpen] = useState(false);

  const togglePreset = () => setIsPresetOpen((prev) => !prev);
  const toggleTextMenu = () => setIsTextMenuOpen((prev) => !prev);
  const getSelectedPreset = () => {
    for (const preset in BrandPreset) {
      if (
        JSON.stringify(editor.getAttributes("textStyle")) ===
        JSON.stringify(BrandPreset[preset])
      ) {
        return preset;
      }
    }
    return "Paragraph";
  };

  return (
    <div className="tiptap-menu">
      {isPresetOpen && (
        <TiptapPresetBar
          editor={editor}
          BrandPreset={BrandPreset}
          selectedPreset={getSelectedPreset()}
        />
      )}
      {isTextMenuOpen && <TiptapTextMenuBar editor={editor} />}
      <button
        onClick={togglePreset}
        className={
          (isPresetOpen ? "is-active" : "") + " brand-setting-style-dropdown"
        }
      >
        {getSelectedPreset()}
        <DropDownIcon />
      </button>
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
        style={{ maxWidth: "80px" }}
        className="dropdown"
        name="fontFamily"
        onChange={(e) => {
          editor.chain().focus().setFontFamily(e.target.value).run();
        }}
        value={editor.getAttributes("textStyle").fontFamily || "Figtree"}
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
      <select
        className="dropdown"
        name="fontSize"
        onChange={(e) => {
          editor.chain().focus().setFontSize(e.target.value).run();
        }}
        value={editor.getAttributes("textStyle").fontSize || "10px"}
      >
        {fontSizes.map((fontSize) => (
          <option key={fontSize} value={fontSize + "px"}>
            {fontSize}
          </option>
        ))}
      </select>
      <div className="color-picker-container">
        <input
          type="color"
          id="color-picker"
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes("textStyle").color || "black"}
        />
      </div>

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
      <div className="divider"></div>
      <button
        className={isTextMenuOpen ? "is-active" : ""}
        onClick={toggleTextMenu}
      >
        <MoreIcon />
      </button>
    </div>
  );
};
