"use client";

// import { addNotionPageToDatabase } from "@/app/_services/notion";

interface ButtonTestProps {
  addNotionPageToDatabase?: () => Promise<void>;
}

export const ButtonTest: React.FC<ButtonTestProps> = ({
  addNotionPageToDatabase,
}) => {
  return (
    <div>
      <button onClick={addNotionPageToDatabase}>Salvar</button>
    </div>
  );
};
