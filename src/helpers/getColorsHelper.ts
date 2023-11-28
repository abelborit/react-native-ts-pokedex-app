import {getColors} from 'react-native-image-colors';

export const getColorsHelper = async (uriImage: string) => {
  const colors = await getColors(uriImage, {
    fallback: '#fff',
    cache: true,
    key: `${uriImage}`,
  });

  let primaryColor;
  let secondaryColor;

  switch (colors.platform) {
    case 'android':
    case 'web':
      // Access android and web properties
      primaryColor = colors.dominant;
      secondaryColor = colors.vibrant;
      break;
    case 'ios':
      // Access iOS properties
      primaryColor = colors.primary;
      secondaryColor = colors.secondary;
      break;
    default:
      throw new Error('Unexpected platform');
  }

  return {
    primaryColor,
    secondaryColor,
  };
};
