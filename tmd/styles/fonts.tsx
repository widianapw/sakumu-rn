import type {Fonts} from '../types';

const fonts: Fonts = {
    thin: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '100',
    },
    light: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '300',
    },
    regular: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '400'
    },
    medium: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
    },
    semiBold: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
    },
    bold: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '700'
    }
}


export default function configureFonts(): Fonts {
    return fonts;
}
