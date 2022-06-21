/**
 * Created by Widiana Putra on 03/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { createContext, useContext, useState } from "react";
import ConfirmationBottomSheet from "../components/BottomSheet/ConfirmationBottomSheet";
import AlertBottomSheet from "../components/BottomSheet/AlertBottomSheet";

type ConfirmationBSContext = {
  imageNode?: React.ReactNode;
  title?: string;
  description?: string;
  buttonPrimaryTitle?: string;
  buttonSecondaryTitle?: string;
  buttonPrimaryAction?: () => void;
  buttonSecondaryAction?: () => void;
  dismissable?: boolean;
}
type BSContextType = {
  showConfirmationBS: (props: ConfirmationBSContext) => void;
  hideConfirmationBS: () => void;
  showAlertBS: (props: ConfirmationBSContext) => void;
  hideAlertBS: () => void;
}
const initialState: BSContextType = {
  showConfirmationBS: () => {
  },
  hideConfirmationBS: () => {
  },
  showAlertBS: () => {
  },
  hideAlertBS: () => {
  },
};

export const BSContext = createContext(initialState);
export const useBottomSheet = () => useContext(BSContext);
const BottomSheetProvider = ({ children }: any) => {
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState<ConfirmationBSContext>({});

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<ConfirmationBSContext>({});

  const showConfirmationBS = (props: ConfirmationBSContext) => {
    setConfirmationProps(props);
    setIsOpenConfirmation(true);
  };

  const showAlertBS = (props: ConfirmationBSContext) => {
    setAlertProps(props);
    setIsOpenAlert(true);
  };

  const hideConfirmationBS = () => {
    setIsOpenConfirmation(false);
  };

  const hideAlertBS = () => {
    setIsOpenAlert(false);
  };

  const renderComponent = () => {
    return <>
      <ConfirmationBottomSheet
        {...confirmationProps}
        open={isOpenConfirmation}
        onClose={() => {
          hideConfirmationBS();
        }} />

      <AlertBottomSheet
        open={isOpenAlert}
        onClose={hideAlertBS}
        {...alertProps} />
    </>;
  };
  return (
    <BSContext.Provider value={{ showConfirmationBS, hideConfirmationBS, showAlertBS, hideAlertBS }}>
      {renderComponent()}
      {children}
    </BSContext.Provider>
  );
};

export default BottomSheetProvider;
