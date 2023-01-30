import React from "react";
import "./Buttons.css";

type TrashIconProps = {
  isContainer: boolean;
  onRemoveElement: () => void;
};

export const TrashIcon: React.FC<TrashIconProps> = ({
  onRemoveElement,
  isContainer,
}) => {
  return (
    <div
      className={(isContainer ? "container-" : "") + "element-button-container"}
      style={{
        right: "0px",
      }}
    >
      <button className="element-button" onClick={onRemoveElement}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#eaf0f2"
        >
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </button>
    </div>
  );
};

type EditIconProps = {
  isContainer: boolean;
  activateTiptap: () => void;
};

export const EditIcon: React.FC<EditIconProps> = ({
  activateTiptap,
  isContainer,
}) => {
  return (
    <div
      className={(isContainer ? "container-" : "") + "element-button-container"}
      style={{
        right: "25px",
      }}
    >
      <button className="element-button" onClick={activateTiptap}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#eaf0f2"
        >
          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
        </svg>
      </button>
    </div>
  );
};

// tiptap
export const BoldIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.52865 5.47917C9.02344 4.89844 9.33334 4.15625 9.33334 3.33333C9.33334 1.49505 7.83803 0 6 0L1.00001 0.000260373C0.539849 0.000260373 0.166672 0.372917 0.166672 0.833594C0.166672 1.29427 0.539849 1.66693 1.00001 1.66693H1.41667V10.0003H1.00001C0.539849 10.0003 0.166672 10.3729 0.166672 10.8336C0.166672 11.2943 0.539849 11.6669 1.00001 11.6669H6.83334C8.67136 11.6669 10.1667 10.1719 10.1667 8.33359C10.1667 7.11719 9.50521 6.0625 8.52865 5.47917ZM3.08334 1.66693H6C6.91928 1.66693 7.66667 2.41484 7.66667 3.33359C7.66667 4.25234 6.91928 5.00026 6 5.00026H3.08334V1.66693ZM6.83334 10H3.08334V6.66667H6.83334C7.75261 6.66667 8.5 7.41432 8.5 8.3099C8.5 9.20547 7.75261 10 6.83334 10Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const ItalicIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.1667 0.625C10.1667 0.970052 9.88672 1.25 9.54167 1.25H7.77136L3.94584 10.4167H6.20834C6.55339 10.4167 6.83334 10.6966 6.83334 11.0417C6.83334 11.3867 6.55469 11.6667 6.20834 11.6667H0.791672C0.44662 11.6667 0.166672 11.388 0.166672 11.0417C0.166672 10.6953 0.44662 10.4167 0.791672 10.4167H2.63021L6.45573 1.25H4.12501C3.78126 1.25 3.50001 0.970052 3.50001 0.625C3.50001 0.279948 3.78126 0 4.12501 0H9.54167C9.88803 0 10.1667 0.279948 10.1667 0.625Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const UnderlineIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.54167 1.58334H2.16667V6.58334C2.16667 8.88074 4.03594 10.75 6.33333 10.75C8.63073 10.75 10.5 8.88074 10.5 6.58334V1.58334H11.125C11.4701 1.58334 11.75 1.3034 11.75 0.958344C11.75 0.613291 11.4714 0.333344 11.125 0.333344H8.625C8.28125 0.333344 8 0.613291 8 0.958344C8 1.3034 8.27995 1.58334 8.625 1.58334H9.25V6.58334C9.25 8.19142 7.94141 9.50001 6.33333 9.50001C4.72526 9.50001 3.41667 8.19272 3.41667 6.58334V1.58334H4.04167C4.38802 1.58334 4.66667 1.3034 4.66667 0.958344C4.66667 0.613291 4.38802 0.333344 4.04167 0.333344H1.54167C1.19661 0.333344 0.916667 0.613291 0.916667 0.958344C0.916667 1.3034 1.19661 1.58334 1.54167 1.58334ZM11.5417 12.4167H1.125C0.779948 12.4167 0.5 12.6979 0.5 13.0417C0.5 13.3854 0.779948 13.6667 1.125 13.6667H11.5417C11.8867 13.6667 12.1667 13.3867 12.1667 13.0417C12.1667 12.6966 11.888 12.4167 11.5417 12.4167Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const HighlightIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.79167 7.29167L11.4583 2.31481L10.7801 1.63426L5.80093 5.30093L7.79167 7.29167ZM3.46296 7.40741V5.74768C3.46296 5.39352 3.62963 5.0625 3.91435 4.85417L10.2361 0.194444C10.4074 0.0671296 10.6157 0 10.8287 0C11.0926 0 11.3472 0.104167 11.5347 0.291667L12.8032 1.56019C12.9907 1.74769 13.0949 2 13.0949 2.2662C13.0949 2.47917 13.0278 2.6875 12.9005 2.8588L8.24074 9.17824C8.03241 9.46296 7.69907 9.62963 7.34722 9.62963H5.68519L5.09722 10.2176C4.80787 10.5069 4.33796 10.5069 4.04861 10.2176L2.875 9.04398C2.58565 8.75463 2.58565 8.28472 2.875 7.99537L3.46296 7.40741ZM0.662037 10.794L2.12037 9.33565L3.75463 10.9699L3.03704 11.6875C2.93287 11.7917 2.79167 11.8495 2.64352 11.8495H1.05556C0.747685 11.8495 0.5 11.6019 0.5 11.294V11.1852C0.5 11.037 0.55787 10.8958 0.662037 10.7917V10.794Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const UndoIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.885677 0.484462C1.11924 0.389254 1.38776 0.441337 1.56693 0.620373L2.63724 1.69069C3.70677 0.639123 5.16615 6.10352e-05 6.72839 6.10352e-05C9.96875 0.0235246 12.5833 2.63785 12.5833 5.85399C12.5833 9.07014 9.96875 11.6847 6.7526 11.6847C5.39036 11.6847 4.0625 11.2074 3.01562 10.3365C2.75026 10.1152 2.71458 9.72144 2.93589 9.45608C3.15805 9.18993 3.55099 9.15504 3.81635 9.37634C4.63802 10.0597 5.67969 10.4373 6.75 10.4373C9.27682 10.4373 11.3333 8.38082 11.3333 5.85399C11.3333 3.32717 9.27604 1.27066 6.75 1.27066C5.52396 1.27066 4.38203 1.773 3.54167 2.59592L4.89948 3.95373C5.07852 4.13277 5.13141 4.40139 5.03539 4.63498C4.9401 4.86962 4.71094 5.02066 4.45833 5.02066H1.125C0.779948 5.02066 0.5 4.74201 0.5 4.39566V1.06233C0.5 0.809202 0.652083 0.581337 0.885677 0.484462Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const RedoIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"} style={{ transform: "scaleX(-1)" }}>
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.885677 0.484462C1.11924 0.389254 1.38776 0.441337 1.56693 0.620373L2.63724 1.69069C3.70677 0.639123 5.16615 6.10352e-05 6.72839 6.10352e-05C9.96875 0.0235246 12.5833 2.63785 12.5833 5.85399C12.5833 9.07014 9.96875 11.6847 6.7526 11.6847C5.39036 11.6847 4.0625 11.2074 3.01562 10.3365C2.75026 10.1152 2.71458 9.72144 2.93589 9.45608C3.15805 9.18993 3.55099 9.15504 3.81635 9.37634C4.63802 10.0597 5.67969 10.4373 6.75 10.4373C9.27682 10.4373 11.3333 8.38082 11.3333 5.85399C11.3333 3.32717 9.27604 1.27066 6.75 1.27066C5.52396 1.27066 4.38203 1.773 3.54167 2.59592L4.89948 3.95373C5.07852 4.13277 5.13141 4.40139 5.03539 4.63498C4.9401 4.86962 4.71094 5.02066 4.45833 5.02066H1.125C0.779948 5.02066 0.5 4.74201 0.5 4.39566V1.06233C0.5 0.809202 0.652083 0.581337 0.885677 0.484462Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const MoreIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="3"
        height="12"
        viewBox="0 0 3 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.41667 8.99999C2.10704 8.99999 2.66667 9.55989 2.66667 10.25C2.66667 10.9401 2.10704 11.5 1.41667 11.5C0.726307 11.5 0.166672 10.9401 0.166672 10.25C0.166672 9.55989 0.726307 8.99999 1.41667 8.99999ZM1.41667 4.83332C2.10704 4.83332 2.66667 5.39322 2.66667 6.08332C2.66667 6.77343 2.10704 7.33332 1.41667 7.33332C0.726307 7.33332 0.166672 6.77343 0.166672 6.08332C0.166672 5.39322 0.726307 4.83332 1.41667 4.83332ZM1.41667 3.16666C0.726307 3.16666 0.166672 2.60676 0.166672 1.91666C0.166672 1.22629 0.726307 0.666656 1.41667 0.666656C2.10704 0.666656 2.66667 1.22629 2.66667 1.91666C2.66667 2.60676 2.10704 3.16666 1.41667 3.16666Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const DropDownIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="9"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.49971 5.49978C4.33979 5.49978 4.1798 5.43874 4.05793 5.31668L0.308097 1.56685C0.0639676 1.32272 0.0639676 0.927227 0.308097 0.683097C0.552227 0.438968 0.947717 0.438968 1.19185 0.683097L4.49971 3.99203L7.80815 0.683585C8.05228 0.439456 8.44777 0.439456 8.6919 0.683585C8.93603 0.927715 8.93603 1.32321 8.6919 1.56734L4.94207 5.31717C4.82 5.43923 4.65986 5.49978 4.49971 5.49978Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const ThreeDotsIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="3"
        height="12"
        viewBox="0 0 3 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.41667 8.99999C2.10704 8.99999 2.66667 9.55989 2.66667 10.25C2.66667 10.9401 2.10704 11.5 1.41667 11.5C0.726307 11.5 0.166672 10.9401 0.166672 10.25C0.166672 9.55989 0.726307 8.99999 1.41667 8.99999ZM1.41667 4.83332C2.10704 4.83332 2.66667 5.39322 2.66667 6.08332C2.66667 6.77343 2.10704 7.33332 1.41667 7.33332C0.726307 7.33332 0.166672 6.77343 0.166672 6.08332C0.166672 5.39322 0.726307 4.83332 1.41667 4.83332ZM1.41667 3.16666C0.726307 3.16666 0.166672 2.60676 0.166672 1.91666C0.166672 1.22629 0.726307 0.666656 1.41667 0.666656C2.10704 0.666656 2.66667 1.22629 2.66667 1.91666C2.66667 2.60676 2.10704 3.16666 1.41667 3.16666Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const LeftAlignIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.875 0.666687C7.22135 0.666687 7.5 0.946635 7.5 1.29169C7.5 1.63674 7.22135 1.91669 6.875 1.91669H0.625C0.279948 1.91669 0 1.63674 0 1.29169C0 0.946635 0.279948 0.666687 0.625 0.666687H6.875ZM11.0417 4.00002C11.388 4.00002 11.6667 4.27867 11.6667 4.62502C11.6667 4.97137 11.388 5.25002 11.0417 5.25002H0.625C0.279948 5.25002 0 4.97137 0 4.62502C0 4.27867 0.279948 4.00002 0.625 4.00002H11.0417ZM0 7.95835C0 7.612 0.279948 7.33335 0.625 7.33335H6.875C7.22135 7.33335 7.5 7.612 7.5 7.95835C7.5 8.30471 7.22135 8.58335 6.875 8.58335H0.625C0.279948 8.58335 0 8.30471 0 7.95835ZM11.0417 10.6667C11.388 10.6667 11.6667 10.9453 11.6667 11.2917C11.6667 11.638 11.388 11.9167 11.0417 11.9167H0.625C0.279948 11.9167 0 11.638 0 11.2917C0 10.9453 0.279948 10.6667 0.625 10.6667H11.0417Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const MiddleAlignIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.54167 0.666687C8.88802 0.666687 9.16667 0.946635 9.16667 1.29169C9.16667 1.63674 8.88802 1.91669 8.54167 1.91669H3.125C2.77865 1.91669 2.5 1.63674 2.5 1.29169C2.5 0.946635 2.77865 0.666687 3.125 0.666687H8.54167ZM11.0417 4.00002C11.388 4.00002 11.6667 4.27867 11.6667 4.62502C11.6667 4.97137 11.388 5.25002 11.0417 5.25002H0.625C0.279948 5.25002 0 4.97137 0 4.62502C0 4.27867 0.279948 4.00002 0.625 4.00002H11.0417ZM2.5 7.95835C2.5 7.612 2.77865 7.33335 3.125 7.33335H8.54167C8.88802 7.33335 9.16667 7.612 9.16667 7.95835C9.16667 8.30471 8.88802 8.58335 8.54167 8.58335H3.125C2.77865 8.58335 2.5 8.30471 2.5 7.95835ZM11.0417 10.6667C11.388 10.6667 11.6667 10.9453 11.6667 11.2917C11.6667 11.638 11.388 11.9167 11.0417 11.9167H0.625C0.279948 11.9167 0 11.638 0 11.2917C0 10.9453 0.279948 10.6667 0.625 10.6667H11.0417Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const RightAlignIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0417 0.666687C11.388 0.666687 11.6667 0.946635 11.6667 1.29169C11.6667 1.63674 11.388 1.91669 11.0417 1.91669H4.79167C4.44531 1.91669 4.16667 1.63674 4.16667 1.29169C4.16667 0.946635 4.44531 0.666687 4.79167 0.666687H11.0417ZM11.0417 4.00002C11.388 4.00002 11.6667 4.27867 11.6667 4.62502C11.6667 4.97137 11.388 5.25002 11.0417 5.25002H0.625C0.279948 5.25002 0 4.97137 0 4.62502C0 4.27867 0.279948 4.00002 0.625 4.00002H11.0417ZM11.0417 8.58335H4.79167C4.44531 8.58335 4.16667 8.30471 4.16667 7.95835C4.16667 7.612 4.44531 7.33335 4.79167 7.33335H11.0417C11.388 7.33335 11.6667 7.612 11.6667 7.95835C11.6667 8.30471 11.388 8.58335 11.0417 8.58335ZM11.0417 10.6667C11.388 10.6667 11.6667 10.9453 11.6667 11.2917C11.6667 11.638 11.388 11.9167 11.0417 11.9167H0.625C0.279948 11.9167 0 11.638 0 11.2917C0 10.9453 0.279948 10.6667 0.625 10.6667H11.0417Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const OrderedListIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.726521 0.625C0.726521 0.279687 1.02965 0 1.35152 0H2.18485C2.55465 0 2.80985 0.279687 2.80985 0.625V3.74896H3.22652C3.59631 3.74896 3.85152 4.03021 3.85152 4.37396C3.85152 4.72031 3.59631 4.99896 3.22652 4.99896H1.14319C0.821313 4.99896 0.518188 4.72031 0.518188 4.37396C0.518188 4.03021 0.821313 3.74896 1.14319 3.74896H1.55985V1.25H1.35152C1.02965 1.25 0.726521 0.970052 0.726521 0.625ZM2.38277 8.05104C2.2109 7.85833 1.90621 7.87135 1.75647 8.08229L1.46689 8.48594C1.26636 8.76719 0.876 8.83229 0.595011 8.63177C0.314021 8.43125 0.249177 8.04063 0.449698 7.76198L0.739282 7.35573C1.35751 6.48854 2.62235 6.42604 3.32288 7.22813C3.87756 7.8401 3.86454 8.81406 3.29423 9.43385L2.38538 10.4156H3.24996C3.59631 10.4156 3.87496 10.6943 3.87496 11.0406C3.87496 11.387 3.59631 11.6656 3.24996 11.6656H0.958292C0.710115 11.6656 0.485375 11.5198 0.385896 11.2906C0.286157 11.0641 0.330688 10.7984 0.498917 10.6161L2.37496 8.5849C2.51298 8.43386 2.51558 8.20469 2.38277 8.05104ZM12.8333 1.04062C13.1796 1.04062 13.4583 1.32057 13.4583 1.66563C13.4583 2.01198 13.1796 2.29063 12.8333 2.29063H5.74996C5.4036 2.29063 5.12496 2.01198 5.12496 1.66563C5.12496 1.32057 5.4036 1.04062 5.74996 1.04062H12.8333ZM12.8333 5.20729C13.1796 5.20729 13.4583 5.48594 13.4583 5.83229C13.4583 6.17865 13.1796 6.45729 12.8333 6.45729H5.74996C5.4036 6.45729 5.12496 6.17865 5.12496 5.83229C5.12496 5.48594 5.4036 5.20729 5.74996 5.20729H12.8333ZM12.8333 9.37396C13.1796 9.37396 13.4583 9.6526 13.4583 9.99896C13.4583 10.3453 13.1796 10.624 12.8333 10.624H5.74996C5.4036 10.624 5.12496 10.3453 5.12496 9.99896C5.12496 9.6526 5.4036 9.37396 5.74996 9.37396H12.8333Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};

export const BulletListIcon: React.FC = () => {
  return (
    <div className={"tiptap-button"}>
      <svg
        width="13"
        height="11"
        viewBox="0 0 13 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.833333 0.333313C1.29349 0.333313 1.66667 0.70649 1.66667 1.16665C1.66667 1.62758 1.29349 1.99998 0.833333 1.99998C0.373177 1.99998 0 1.62758 0 1.16665C0 0.70649 0.373177 0.333313 0.833333 0.333313ZM11.875 0.541646C12.2214 0.541646 12.5 0.821594 12.5 1.16665C12.5 1.513 12.2214 1.79165 11.875 1.79165H3.95833C3.61198 1.79165 3.33333 1.513 3.33333 1.16665C3.33333 0.821594 3.61198 0.541646 3.95833 0.541646H11.875ZM11.875 4.70831C12.2214 4.70831 12.5 4.98696 12.5 5.33331C12.5 5.67967 12.2214 5.95831 11.875 5.95831H3.95833C3.61198 5.95831 3.33333 5.67967 3.33333 5.33331C3.33333 4.98696 3.61198 4.70831 3.95833 4.70831H11.875ZM11.875 8.87498C12.2214 8.87498 12.5 9.15363 12.5 9.49998C12.5 9.84633 12.2214 10.125 11.875 10.125H3.95833C3.61198 10.125 3.33333 9.84633 3.33333 9.49998C3.33333 9.15363 3.61198 8.87498 3.95833 8.87498H11.875ZM0.833333 6.16665C0.373177 6.16665 0 5.79425 0 5.33331C0 4.87238 0.373177 4.49998 0.833333 4.49998C1.29349 4.49998 1.66667 4.87238 1.66667 5.33331C1.66667 5.79425 1.29349 6.16665 0.833333 6.16665ZM0.833333 8.66665C1.29349 8.66665 1.66667 9.03904 1.66667 9.49998C1.66667 9.96092 1.29349 10.3333 0.833333 10.3333C0.373177 10.3333 0 9.96092 0 9.49998C0 9.03904 0.373177 8.66665 0.833333 8.66665Z"
          fill="#697789"
        />
      </svg>
    </div>
  );
};
