"use client";

import { Button } from "@/components/ui/button";

export const FAQButton = () => {
  return (
    <Button
      onClick={() => {
        try {
          const element = document.getElementById("faq");
          element?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {}
      }}
      variant="outline"
      className="ml-2"
    >
      Frågor?
    </Button>
  );
};
