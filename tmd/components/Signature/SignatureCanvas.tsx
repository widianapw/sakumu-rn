import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { Button, Stack, useTheme } from "../../index";
import LabelInput from "../TextInput/Label/LabelInput";
import { View } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { useLocale } from "../../../src/providers/LocaleProvider";

interface Props {
  onChanged?: (signature: string) => void;
  onReset?: () => void;
  label?: string;
  requiredLabel?: boolean;
  resetTitle?: string;
}

export default function SignatureCanvas({
                                          onChanged,
                                          onReset,
                                          label,
                                          requiredLabel,
                                          resetTitle,
                                          ...rest
                                        }: Props & ComponentProps<typeof SignatureScreen>) {
  const ref = useRef<SignatureViewRef>(null);
  const [signature, setSignature] = useState("");
  const { colors } = useTheme();

  useEffect(() => {
    if (onChanged) {
      onChanged(signature);
    }
  }, [signature]);


  const { t } = useLocale();
  return (
    <View style={{ flex: 1 }}>
      <Stack direction={"row"} items={"center"} content={"space-between"}>
        <View>
          {
            label &&
            <LabelInput label={label} required={requiredLabel} />
          }
        </View>
        <Button size={"sm"} variant={"secondary"} onPress={() => {
          ref.current?.clearSignature();
          if (onReset) {
            onReset();
          }
          setSignature("");
        }}>{resetTitle ?? t("reset")}</Button>
      </Stack>
      <View style={{
        flex: 1,
        height: "100%",
        borderWidth: 1, borderRadius: 12, borderColor: colors.neutral.neutral_40,
        marginTop: 8, padding: 2.5,
      }}>
        <SignatureScreen
          onOK={(data) => {
            setSignature(data);
          }}
          onEnd={() => {
            ref?.current?.readSignature();
          }}
          onEmpty={() => {
            setSignature("");
          }}
          style={{
            height: "100%",
          }}
          webviewContainerStyle={{
            height: "100%",
          }}
          webStyle={`
                  .m-signature-pad {box-shadow: none; border: none; border-radius:12px} 
                  .m-signature-pad--body {border:none; border-radius: 8px; }
                  .m-signature-pad--body
                   canvas {
                    background-color: #fff;
                    height:100vh;
                    border-radius: 8px;
                   }
                  .m-signature-pad--footer{ 
                    display:none
                  }`
          }
          ref={ref}
          {...rest}
        />
      </View>
    </View>
  );
}
