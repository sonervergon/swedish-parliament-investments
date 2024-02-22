"use client";

import { PropsWithChildren } from "react";

export const Alert = ({
  children,
  text,
}: PropsWithChildren<{ text: string }>) => {
  return (
    <div className="cursor-pointer" onClick={() => alert(text)}>
      {children}
    </div>
  );
};
