import React, {useMemo, useRef, useState} from 'react';
import _introData from '../../domain/data/_introData.ts';
import {Dimensions, FlatList, View, ViewToken} from 'react-native';
import {defaultThemeColors} from '@tmd/styles/defaultThemeColors.tsx';
import {Button, Page, Stack, Typography} from '@tmd';
import {dispatch} from '../../../../redux/stores/store.ts';
import {SPLASH_REDUCER_ACTION} from '../../../../redux/reducers/splashReducer.ts';

export default function IntroScreen() {
  const [currIndex, setCurrIndex] = useState(0);
  const ref = useRef(null);
  const data = _introData;
  const onViewRef = React.useRef((info: {viewableItems: ViewToken[]}) => {
    if (info.viewableItems.length) {
      setCurrIndex(info.viewableItems[0]?.index);
    }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 100});

  const isFirst = useMemo(() => {
    return currIndex === 0;
  }, [data, currIndex]);

  const isLast = useMemo(() => {
    return currIndex === data.length - 1;
  }, [data, currIndex]);
  const handleNext = () => {
    if (currIndex < data.length - 1) {
      handleChangePosition(currIndex + 1);
    } else {
      handleToLoginPage();
    }
  };

  const handlePrev = () => {
    if (currIndex > 0) {
      handleChangePosition(currIndex - 1);
    }
  };

  const handleChangePosition = (index: number) => {
    setCurrIndex(index);
    ref?.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const handleToLoginPage = () => {
    dispatch({
      type: SPLASH_REDUCER_ACTION.FINISH_INTRO,
    });
    // dispatch({
    //     type: "SHOW_INTRO",
    //     payload: {
    //         showIntro: false,
    //     },
    // })
    // navigate("LoginScreen")
  };

  return (
    <Page>
      <FlatList
        ref={ref}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        data={data}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          // @ts-ignore
          return (
            <Stack
              direction={'column'}
              style={{
                width: Dimensions.get('window').width,
                height: '100%',
              }}>
              <Stack
                style={{
                  height: '60%',
                  justifyContent: 'flex-end',
                }}>
                <View style={{}}>
                  {/*<Image*/}
                  {/*    style={{*/}
                  {/*        width: '100%',*/}
                  {/*        objectFit: 'fill',*/}
                  {/*    }}*/}
                  {/*    source={item.image}/>*/}
                </View>
              </Stack>
              <Stack
                p={16}
                style={{
                  height: '40%',
                }}>
                <Typography
                  style={{
                    textAlign: 'center',
                  }}
                  color={'black'}
                  type={'title1'}>
                  {item.title}
                </Typography>
                <Typography
                  style={{
                    textAlign: 'center',
                    marginTop: 8,
                    fontSize: 16,
                  }}>
                  {item.description}
                </Typography>
              </Stack>
            </Stack>
          );
        }}
      />

      <Stack
        content={'center'}
        style={{
          width: Dimensions.get('window').width,
          height: '15%',
        }}>
        <Stack
          direction={'row'}
          content={'space-between'}
          items={'center'}
          mx={16}>
          <View
            style={{
              flex: 1,
            }}>
            {!isFirst ? (
              <Button onPress={handlePrev} variant={'tertiary'}>
                Back
              </Button>
            ) : undefined}
          </View>
          <Stack direction={'row'} spacing={8}>
            {data.map((item, index) => {
              return (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      currIndex === index
                        ? defaultThemeColors.primary.main
                        : defaultThemeColors.neutral.neutral_50,
                  }}></View>
              );
            })}
          </Stack>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Button onPress={handleNext} variant={'tertiary'}>
              {isLast ? 'Get Started' : 'Next'}
            </Button>
          </View>
        </Stack>
      </Stack>
    </Page>
  );
}
