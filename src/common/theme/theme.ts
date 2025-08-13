import { ThemeMode } from '@/app/app-slice';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    boho: {
      texturedBg: string;
      macrameBorder: string;
      clayShadow: string;
    };
  }
  
  interface ThemeOptions {
    boho?: {
      texturedBg?: string;
      macrameBorder?: string;
      clayShadow?: string;
    };
  }
}

export const getTheme = (themeMode: ThemeMode) => {
  const isDark = themeMode === 'dark';
  // Boho color palette
  const olive = '#6B8E23';       // Основной оливковый
  const clay = '#CC8B65';        // Терракотовый
  const sand = '#D7C0A5';        // Песочный
  const darkBrown = '#4A3A2F';   // Темно-коричневый
  const linen = '#FAF3E0';       // Льняной
  const sage = '#B2B38A';        // Серо-зеленый

  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: clay,          // Терракотовый как основной
        light: '#D9A38A',
        dark: '#B37250',
        contrastText: linen,
      },
      secondary: {
        main: olive,         // Оливковый как вторичный
        light: '#8F9779',
        dark: '#4B5320',
        contrastText: linen,
      },
      background: {
        default: isDark ? darkBrown : linen,
        paper: isDark ? '#5D4C3E' : sand,
      },
      text: {
        primary: isDark ? sand : darkBrown,
        secondary: isDark ? sage : olive,
      },
      error: {
        main: '#A26769',     // Приглушенный красный
      },
      warning: {
        main: '#D4A373',     // Теплый желто-коричневый
      },
      info: {
        main: '#7A918D',     // Мутно-бирюзовый
      },
      success: {
        main: '#6B8E23',     // Оливковый
      },
    },
    typography: {
      fontFamily: '"Montserrat", "Roboto", sans-serif',
      h1: {
        fontSize: '3.2rem',
        fontWeight: 500,
        letterSpacing: '0.5px',
        color: isDark ? clay : darkBrown,
      },
      h2: {
        fontSize: '2.4rem',
        fontWeight: 500,
        fontStyle: 'italic',
        color: olive,
        borderBottom: `2px solid ${sage}`,
        paddingBottom: '8px',
      },
      body1: {
        fontSize: '1.1rem',
        lineHeight: 1.6,
        color: isDark ? sand : darkBrown,
      },
      button: {
        textTransform: 'none',
        letterSpacing: '0.5px',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8, // Мягкие скругления в бохо-стиле
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '10px 24px',
            transition: 'all 0.3s ease',
            border: '1px solid',
            borderColor: isDark ? clay : olive,
            '&:hover': {
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
          },
        },
        variants: [
          {
            props: { variant: 'contained' },
            style: {
              backgroundColor: olive,
              color: linen,
              '&:hover': {
                backgroundColor: isDark ? '#4B5320' : '#5A6E1E',
              },
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              color: olive,
              borderColor: olive,
              '&:hover': {
                backgroundColor: 'rgba(107, 142, 35, 0.08)',
                borderWidth: '2px',
              },
            },
          },
          {
            props: { variant: 'text' },
            style: {
              color: clay,
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
                textDecorationColor: sage,
              },
            },
          },
        ],
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: isDark 
              ? 'linear-gradient(rgba(74, 58, 47, 0.9), rgba(74, 58, 47, 0.9))'
              : 'linear-gradient(rgba(250, 243, 224, 0.9), rgba(250, 243, 224, 0.9))',
            border: `1px solid ${isDark ? clay : sage}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? darkBrown : 'transparent',
            color: isDark ? sand : darkBrown,
            boxShadow: 'none',
            borderBottom: `1px solid ${isDark ? clay : olive}`,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: clay,
            textDecoration: 'none',
            '&:hover': {
              color: olive,
              textDecoration: 'underline',
              textDecorationColor: sage,
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark ? 'rgba(204, 139, 101, 0.3)' : 'rgba(107, 142, 35, 0.3)',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDark ? clay : olive,
            '&:hover': {
              backgroundColor: 'transparent',
              transform: 'scale(1.1)',
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 60,
            height: 34,
            padding: 7,
            '& .MuiSwitch-switchBase': {
              padding: 0,
              transform: 'translateX(6px)',
              '&.Mui-checked': {
                transform: 'translateX(30px)',
                '& + .MuiSwitch-track': {
                  opacity: 1,
                  backgroundColor: isDark ? '#ff6b6b' : olive,
                },
              },
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: '#fff',
              width: 20,
              height: 20,
            },
            '& .MuiSwitch-track': {
              borderRadius: 20 / 2,
              backgroundColor: isDark ? '#4d4d4d' : '#e0e0e0',
              opacity: 1,
              transition: 'all 0.3s ease',
            },
          },
        },
      },
    },
    boho: {
      texturedBg: isDark 
        ? 'linear-gradient(rgba(74, 58, 47, 0.8), rgba(74, 58, 47, 0.8)), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23CC8B65\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
        : 'linear-gradient(rgba(250, 243, 224, 0.8), rgba(250, 243, 224, 0.8)), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%236B8E23\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      macrameBorder: isDark
        ? `repeating-linear-gradient(
            90deg,
            ${clay},
            ${clay} 5px,
            transparent 5px,
            transparent 10px
          )`
        : `repeating-linear-gradient(
            90deg,
            ${olive},
            ${olive} 5px,
            transparent 5px,
            transparent 10px
          )`,
      clayShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    },
  });
};