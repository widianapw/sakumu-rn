import React from 'react';
import {Button, Page, RHFTextField, Stack, Typography} from '@tmd';
import * as Yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppNavigationType from '../../../../navigations/AppNavigationType.ts';

export default function RegisterScreen({
  navigation,
}: NativeStackScreenProps<AppNavigationType, 'RegisterScreen'>) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
    ),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });
  return (
    <Page>
      <FormProvider {...methods}>
        <Stack
          p={16}
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Typography
            style={{
              fontWeight: 'bold',
            }}
            type={'h3'}>
            Register your account
          </Typography>

          <Stack spacing={16} mt={16}>
            <RHFTextField
              name={'name'}
              label={'Name'}
              placeholder={'Enter your name'}
            />
            <RHFTextField
              name={'email'}
              label={'Email'}
              autoCapitalize={'none'}
              placeholder={'Enter your email'}
            />
            <RHFTextField
              name={'password'}
              label={'Password'}
              placeholder={'Enter your password'}
              password
            />
            <RHFTextField
              name={'password_confirmation'}
              label={'Password Confirmation'}
              placeholder={'Enter your password confirmation'}
              password
            />

            <Button
              onPress={methods.handleSubmit(data => {
                console.log(data);
              })}
              buttonStyle={{
                width: '100%',
                marginTop: 16,
              }}>
              Register
            </Button>
            <Button
              onPress={navigation.goBack}
              variant={'secondary'}
              buttonStyle={{
                width: '100%',
              }}>
              Login
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Page>
  );
}
