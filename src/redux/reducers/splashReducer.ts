/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */

export type SplashState = {
  isLoading: boolean;
  isNeedIntro: boolean;
};

const initialState: SplashState = {
  isLoading: true,
  isNeedIntro: true,
};

export const SPLASH_REDUCER_ACTION = {
  DONE_LOADING_SPLASH: 'DONE_LOADING_SPLASH',
  FINISH_INTRO: 'FINISH_INTRO',
};

const splashReducer = (state: SplashState = initialState, action: any) => {
  switch (action.type) {
    case SPLASH_REDUCER_ACTION.DONE_LOADING_SPLASH:
      return {
        ...state,
        isLoading: false,
      };
    case SPLASH_REDUCER_ACTION.FINISH_INTRO:
      return {
        ...state,
        isNeedIntro: false,
      };
    default:
      return state;
  }
};
export default splashReducer;
