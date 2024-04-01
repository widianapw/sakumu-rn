/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, {useEffect, useMemo, useState} from 'react';
import {Button, Divider, Icon, Stack, TextField, Typography, Page} from '@tmd';
import Toolbar from '@tmd/components/Toolbar/Toolbar';
import {useAuth} from '@modules/auth/domain/providers/AuthProvider';

const MainScreen = ({navigation}: any) => {
  const {user, logout, isLoadingLogout} = useAuth();
  const [search, setSearch] = useState('');
  const handleLogout = () => {
    logout();
  };

  return (
    <Page>
      <Toolbar
        backable={false}
        center
        actionButton={
          <Button
            colorVariant={'danger'}
            variant={'secondary'}
            size={'sm'}
            onPress={handleLogout}>
            Logout
          </Button>
        }
        title={'RN TDS'}
      />
      <Stack p={16}>
        <TextField
          search
          placeholder={'Cari...'}
          onInvokeTextChanged={val => {
            setSearch(val);
          }}
        />
      </Stack>
    </Page>
  );
};

export default MainScreen;
