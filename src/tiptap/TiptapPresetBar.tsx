import React from "react";
import "./Buttons.css";

const BrandStyleTypography = [
  "Paragraph",
  "Heading 1",
  "Heading 2",
  "Heading 3",
  "Heading 4",
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
