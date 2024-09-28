import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';
import { ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { ColorProvider } from './ColorProvider.jsx';
import { RecoilRoot } from 'recoil'

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('#FAFAFA', '#0A0A0A')(props),
    }
  })
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: '#777777',
    dark: '#1e1e1e'
  },
  bgColor: { 
    light: '#ffffff',
    dark: '#181818'
  },
  borderColor: { 
    light: '#D5D5D5',
    dark: '#2D2D2D'
  },
  avatarBorderColor: { 
    light: 'rgba(0, 0, 0, 0.15)',
    dark: 'rgba(243, 245, 247, 0.15)'
  },
  highlightedBorderColor: { 
    light: '#000000',
    dark: '#F3F5F7'
  },
  iconHoverColor: { 
    light: '#e0dfdf',
    dark: '#3a3a3a'
  },
  bgHoverColor: { 
    light: '#f0efef',
    dark: '#252525'
  },
  threadColor: { 
    light: '#E0E0E0',
    dark: '#333639'
  },
  postTextColor: { 
    light: '#000000',
    dark: '#F3F5F7'
  },
  countColor: { 
    light: '#424242',
    dark: '#cccccc'
  },
  buttonColors: {
    bg: {
      light: '#000000',
      dark: '#ffffff'
    },
    text: {
      light: '#ffffff',
      dark: '#101010'
    },
    hoverBg: {
      light: '#424242',
      dark: '#cccccc'
    },
    icon: {
      light: '#000000',
      dark: '#BCBDBF'
    }
  },
};

const theme = extendTheme({ config, styles, colors })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme} >
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ColorProvider>
            <App />
          </ColorProvider>
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
