"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FloatingLabelInput } from "@/components/ui/float-input";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useDialog } from "./authorization";

export function Authorization() {
  const { visible, hideDialog } = useDialog();
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleGenerateCode() {
    setLoading(true);
    setTimeout(() => {
      setValue("332432");
      setLoading(false);
    }, 3000);
  }

  return (
    <Dialog open={visible} onOpenChange={hideDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Autorizar cliente</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 py-4">
          <FloatingLabelInput
            label="código"
            name="code"
            className="w-64"
            disabled
            value={value}
          />
          <Button onClick={handleGenerateCode} disabled={value.length > 0}>
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Gerar código"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
