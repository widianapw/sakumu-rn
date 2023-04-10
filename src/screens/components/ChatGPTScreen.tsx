/**
 * Created by Widiana Putra on 08/02/2023
 * Copyright (c) 2023 - Made with love
 */

import React, { useRef, useState } from "react";
import { Button, Page, RHFTextField, Stack, TextField, Toast, Toolbar } from "../../../tmd";
import { ScrollView, TextInput } from "react-native";
import useChatGPTService from "../../services/useChatGPTService";
import Typography from "../../../tmd/components/Typography/Typography";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ChatGPTScreen() {
  const { postCompletion } = useChatGPTService();
  const [repliedMessage, setRepliedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await postCompletion(data?.message, data?.max_tokens);
      setRepliedMessage(res?.choices[0]?.text);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show(e?.message, {
        colorVariant: "danger",
      });
    }
  };

  const schema = yup.object().shape({
    message: yup.string().required("Message is required"),
    max_tokens: yup.number().min(10).required("Max Tokens is required"),
  });
  const methods = useForm({
    defaultValues: {
      message: "Write a tagline for an ice cream shop",
      max_tokens: "100",
    },
    resolver: yupResolver(schema),
  });


  return <FormProvider {...methods}>
    <Page>
      <Toolbar title={"OpenAI davinci-003"} backable={false} />
      <ScrollView>
        <Stack p={16}>
          <Stack spacing={8}>
            <RHFTextField
              label={"Message"}
              name={"message"} placeholder={"message"} />
            <RHFTextField
              keyboardType={"numeric"}
              label={"Maximum Answer (Word Count)"}
              name={"max_tokens"} placeholder={"Max Tokens"} />
            <Button
              buttonStyle={{
                width: "100%",
              }}
              loading={isLoading} onPress={methods.handleSubmit(onSubmit)}>Submit</Button>
          </Stack>
          <Stack>
            <Typography type={"body1"}>{repliedMessage}</Typography>
          </Stack>
        </Stack>
      </ScrollView>

    </Page>
  </FormProvider>;
}
