/**
 * Created by Widiana Putra on 20/05/2022
 * Copyright (c) 2022 - Made with love
 */
import {useContext} from 'react';
import {ThemeContext} from './ThemeProvider';

const useTheme = () => {
    return useContext(ThemeContext);
};

export {useTheme};
