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
  LeftAlignIcon,
  MiddleAlignIcon,
  RightAlignIcon,
  OrderedListIcon,
  BulletListIcon,
} from "./Buttons";
import "./Buttons.css";

const fonts = [
  "Figtree",
  "Caveat",
  "Explora",
  "Quicksand",
  "Raleway",
  "Roboto",
  "Special Elite",
];

const fontSizes = [10, 11, 12, 14, 16, 18, 20, 24, 28, 30, 35, 40, 45, 50];

const BrandStyleSetting1 = {
  Paragraph: {
    fontFamily: "Raleway",
    fontSize: "",
    color: "",
  },
  H1: {
    fontFamily: "Explora",
    fontSize: "50px",
    color: "rgb(141, 119, 119)",
  },
  H2: { fontFamily: "Caveat", fontSize: "30px", color: "rgb(71, 89, 107)" },
  H3: { fontFamily: "Quicksand", fontSize: "20px", color: "rgb(97, 97, 97)" },
  H4: {
    fontFamily: "Special Elite",
    fontSize: "",
    color: "",
  },
};

const BrandStyleSettingMap = {
  Paragraph: "Paragraph",
  H1: "Heading 1",
  H2: "Heading 2",
  H3: "Heading 3",
  H4: "Heading 4",
};

const BrandStyleTypography = ["Paragraph", "H1", "H2", "H3", "H4"] as const;

type MenuBarProps = {
  editor: any;
  isTextMenuOpen: boolean;
  isBrandStyleMenuOpen: boolean;
  selectedTextBrandStyle: string;
  toggleTextMenu: () => void;
  toggleBrandStyleMenu: () => void;
};

const MenuBar: React.FC<MenuBarProps> = ({
  editor,
  isTextMenuOpen,
  isBrandStyleMenuOpen,
  selectedTextBrandStyle,
  toggleTextMenu,
  toggleBrandStyleMenu,
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-menu" style={{}}>
      <button
        onClick={toggleBrandStyleMenu}
        className={
          (isBrandStyleMenuOpen ? "is-active" : "") +
          " brand-setting-style-dropdown"
        }
      >
        {
          BrandStyleSettingMap[
            selectedTextBrandStyle as keyof typeof BrandStyleSettingMap
          ]
        }
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

type TextMenuBarProps = {
  editor: any;
};

const TextMenuBar: React.FC<TextMenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

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

type BrandStyleMenuProp = {
  editor: any;
  setSelectedTextBrandStyle: (preset: string) => void;
};

const BrandStyleMenuBar: React.FC<BrandStyleMenuProp> = ({
  editor,
  setSelectedTextBrandStyle,
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-brand-setting-menu" style={{}}>
      {BrandStyleTypography.map((preset) => {
        const matchingStyle =
          JSON.stringify(editor.getAttributes("textStyle")) ===
          JSON.stringify(BrandStyleSetting1[preset]);
        if (matchingStyle) setSelectedTextBrandStyle(preset);
        return (
          <button
            onClick={(e) => {
              editor
                .chain()
                .focus()
                .setFontFamily(BrandStyleSetting1[preset].fontFamily)
                .setFontSize(BrandStyleSetting1[preset].fontSize)
                .setColor(BrandStyleSetting1[preset])
                .run();
            }}
            className={
              JSON.stringify(editor.getAttributes("textStyle")) ===
              JSON.stringify(BrandStyleSetting1[preset])
                ? "is-active"
                : ""
            }
            style={BrandStyleSetting1[preset]}
          >
            {preset}
          </button>
        );
      })}
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
  const [isEditingText, setIsEditingText] = useState(false);
  const [isSelectingBrandStyle, setIsSelectingBrandStyle] = useState(false);
  const [selectedTextBrandStyle, setSelectedTextBrandStyle] =
    useState("Paragraph");

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
      setIsEditingText(false);
      setIsSelectingBrandStyle(false);
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

  const handleSelectedTextBrandStyle = (preset: string) => {
    setSelectedTextBrandStyle(preset);
  };

  return (
    <div
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        handleBlur(e);
      }}
    >
      {isEditing && (
        <MenuBar
          editor={editor}
          isTextMenuOpen={isEditingText}
          isBrandStyleMenuOpen={isSelectingBrandStyle}
          selectedTextBrandStyle={selectedTextBrandStyle}
          toggleTextMenu={() => {
            setIsEditingText((prev) => !prev);
          }}
          toggleBrandStyleMenu={() => {
            setIsSelectingBrandStyle((prev) => !prev);
          }}
        />
      )}
      {isEditingText && <TextMenuBar editor={editor} />}
      {isSelectingBrandStyle && (
        <BrandStyleMenuBar
          editor={editor}
          setSelectedTextBrandStyle={setSelectedTextBrandStyle}
        />
      )}
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
