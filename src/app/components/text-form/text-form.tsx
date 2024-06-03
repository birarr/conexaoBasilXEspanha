import { useEffect, useState } from "react";
import Tiptap from "../utils/text-editor/text-editor";

interface TextFormProps {
  setText: (item: string) => void;
}

export const TextForm: React.FC<TextFormProps> = ({ setText }) => {
  return (
    <div className="w-full">
      {/* <Tiptap setText={setText} /> */}
      <Tiptap setText={setText} />
    </div>
  );
};
