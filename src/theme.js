import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      }
    }
  },
  colors: {
    brand: {
      50: '#f0e4ff',
      100: '#d1b3ff',
      200: '#b282ff',
      300: '#9251ff',
      400: '#7320ff',
      500: '#5a00e6',
      600: '#4600b4',
      700: '#330082',
      800: '#200051',
      900: '#0d0021',
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'brand.400',
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'brand.400',
      },
    },
  },
});

export default theme; 