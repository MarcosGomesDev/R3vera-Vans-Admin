"use client";

import { create } from "zustand";

interface Props {
  visible: boolean;
  showDialog: () => void;
  hideDialog: () => void;
}

const useDialogStore = create<Props>((set) => ({
  visible: false,
  showDialog: () =>
    set({
      visible: true,
    }),
  hideDialog: () =>
    set({
      visible: false,
    }),
}));

function useDialogZustand(): Props {
  const visible = useDialogStore((state) => state.visible);
  const showDialog = useDialogStore((state) => state.showDialog);
  const hideDialog = useDialogStore((state) => state.hideDialog);

  return {
    visible,
    showDialog,
    hideDialog,
  };
}

export function useDialog(): Props {
  return useDialogZustand();
}
