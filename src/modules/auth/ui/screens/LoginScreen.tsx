import React from 'react';
import {appTheme, Page, RHFTextField, Stack} from '../../../../../tmd';
import * as Yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Typography} from '@tmd';
import TextButton from '@tmd/components/Button/TextButton.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppNavigationType from '../../../../navigations/AppNavigationType.ts';

export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<AppNavigationType, 'LoginScreen'>) {
  const {colors} = appTheme();
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {};

  return (
    <Page>
      <FormProvider {...methods}>
        <Stack
          p={16}
          content={'center'}
          style={{
            flex: 1,
          }}>
          <Typography type={'label1'}>Welcome to the SakuMu</Typography>
          <Typography
            style={{
              fontWeight: 'bold',
              marginTop: 8,
            }}
            type={'h3'}>
            Login to your account
          </Typography>

          <Stack
            direction={'row'}
            mt={16}
            items={'center'}
            content={'space-between'}>
            <Typography>Don't have an account?</Typography>
            <TextButton
              onPress={() => {
                navigation.navigate('RegisterScreen');
              }}
              underline
              size={'md'}>
              Register here
            </TextButton>
          </Stack>
          <Stack mt={16} spacing={16}>
            <RHFTextField
              placeholder={'Enter your email'}
              name={'email'}
              label={'Email'}
            />
            <RHFTextField
              placeholder={'Enter your password'}
              name={'password'}
              label={'Password'}
              password
            />
            <Button
              onPress={methods.handleSubmit(onSubmit)}
              buttonStyle={{
                width: '100%',
                marginTop: 16,
              }}>
              Login
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Page>
  );
}
