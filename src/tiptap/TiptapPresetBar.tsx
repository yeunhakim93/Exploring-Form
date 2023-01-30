import React from "react";
import "./Buttons.css";

const BrandStyleTypography = [
  "Paragraph",
  "Heading 1",
  "Heading 2",
  "Heading 3",
  "Heading 4",
  "Link",
] as const;

type TiptapPresetBarProp = {
  editor: any;
  BrandPreset: any;
  selectedPreset: string;
};

export const TiptapPresetBar: React.FC<TiptapPresetBarProp> = ({
  editor,
  BrandPreset,
  selectedPreset,
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-brand-setting-menu" style={{}}>
      {BrandStyleTypography.map((preset) => {
        if (preset === "Link")
          return (
            <button
              key={preset}
              onClick={() => {
                // insertHTML(editor, "hey", {
                //   color: "red",
                //   backgroundColor: "blue",
                // });
                // const element = document.createElement("div");
                // element.innerHTML = "hi";
                // element.style.cssText =
                //   "font-family: Caveat; font-size: 50px; color: rgb(60, 109, 92)";

                editor.commands.insertContent(
                  `<p style="font-family: Figtree; font-size: 50px; color: #cadetblue;"><mark  padding:30px color:cadetblue>   Contract   </mark></p>`
                );
              }}
              className={selectedPreset === preset ? "is-active" : ""}
              style={BrandPreset[preset]}
            >
              {preset}
            </button>
          );
        else
          return (
            <button
              key={preset}
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .setFontFamily(BrandPreset[preset].fontFamily)
                  .setFontSize(BrandPreset[preset].fontSize)
                  .setColor(BrandPreset[preset].color)
                  .run();
              }}
              className={selectedPreset === preset ? "is-active" : ""}
              style={BrandPreset[preset]}
            >
              {preset}
            </button>
          );
      })}
    </div>
  );
};
