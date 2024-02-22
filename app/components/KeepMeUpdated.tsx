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
import posthog from "posthog-js";
import { useState } from "react";

export const KeepMeUpdated = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
            posthog.capture("Clicked Keep Me Updated");
          }}
        >
          Håll mig uppdaterad
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vi kan hålla dig uppdaterad</DialogTitle>
          <DialogDescription>
            Vi kommer uppdatera denna lista kontinuerligt, håll utkik här eller
            få uppdateringar via e-post när listan blir uppdaterad.
          </DialogDescription>
          <form
            onSubmit={(data) => {
              const form = new FormData(data.currentTarget);
              const email = form.get("email");
              posthog.capture("Submited Email for List Updates", {
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
