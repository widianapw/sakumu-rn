/**
 * Created by Widiana Putra on 21/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import AlertBottomSheet from "./AlertBottomSheet";

interface Props {
  open: boolean;
  imageNode?: React.ReactNode;
  title?: string;
  description?: string;
  buttonPrimaryTitle?: string;
  buttonSecondaryTitle?: string;
  buttonPrimaryAction?: () => void;
  buttonSecondaryAction?: () => void;
  onClose: () => void;
  dismissable?: boolean;
}

export default function ConfirmationBottomSheet({ open, buttonPrimaryTitle, buttonSecondaryTitle, ...rest }: Props) {
  return (
    <>
      <AlertBottomSheet
        open={open}
        buttonSecondaryTitle={buttonSecondaryTitle ?? "Back"}
        buttonPrimaryTitle={buttonPrimaryTitle ?? "Sure"}
        buttonSecondary={true}
        {...rest}
      />
    </>
  );
}
