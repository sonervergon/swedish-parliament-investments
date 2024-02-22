"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { posthog } from "posthog-js";
import { PropsWithChildren, useState } from "react";

export const InvestmentsClickable = ({
  children,
  firstName,
  lastName,
  amount,
}: PropsWithChildren<{
  firstName: string;
  lastName: string;
  amount: number;
}>) => {
  const [open, setOpen] = useState(false);
  const fullName = firstName + " " + lastName;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="cursor-pointer underline"
          onClick={() => {
            setOpen(true);
            posthog.capture("Clicked Investment", { name: fullName, amount });
          }}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {firstName} har investerat i {amount} bolag
          </DialogTitle>
          <DialogDescription className="mb-3">
            Snart kommer du även kunna se vilka bolag {fullName} har investerat
            i. Håll utkik här eller dela din e-post så får du en notifikation
            när datan är tillgänglig.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(data) => {
            const form = new FormData(data.currentTarget);
            const email = form.get("email");
            posthog.capture("Submited Email for Investment Updates", {
              name: fullName,
              email,
              amount,
            });
            setOpen(false);
          }}
        >
          <Input type="email" required placeholder="Email" />
          <DialogFooter className="mt-3">
            <Button type="submit">Håll mig uppdaterad</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
