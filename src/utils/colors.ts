import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue', // your custom color
    background: 'white', // your custom color
    card: 'green', // your custom color
    text: 'black', // your custom color
    border: 'gray', // your custom color
    notification: 'red', // your custom color
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'lightblue', // your custom color
    background: 'black', // your custom color
    card: 'darkgreen', // your custom color
    text: 'white', // your custom color
    border: 'lightgray', // your custom color
    notification: 'darkred', // your custom color
  },
};
