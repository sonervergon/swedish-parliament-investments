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
  name,
}: PropsWithChildren<{ name: string }>) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="cursor-pointer underline"
          onClick={() => {
            setOpen(true);
            posthog.capture("Clicked Investment", { name });
          }}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vi jobbar på det</DialogTitle>
          <DialogDescription className="mb-3">
            Snart kommer du kunna se vilka bolag {name} har investerat i. Håll
            utkik här eller dela din e-post så får du en notifikation när datan
            är tillgänglig.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(data) => {
            const form = new FormData(data.currentTarget);
            const email = form.get("email");
            posthog.capture("Submited Email for Investment Updates", {
              name,
              email,
            });
            setOpen(false);
          }}
        >
          <Input type="email" required placeholder="Email" className="mt-3" />
          <DialogFooter className="mt-3">
            <Button type="submit">Håll mig uppdaterad</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
