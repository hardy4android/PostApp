import { DateTime } from 'luxon';
import { Platform } from 'react-native';


export default {
  container: 24,
  paddingScreenBottomGap: 16 + Platform.select({ android: 30, default: 0 }),
  errorCodes: {
    ACCESS_TOKEN_NOT_FOUND: 'access token not found',
    REFRESH_TOKEN_OR_UUID_NOT_FOUND: 'refresh token or UUID not found',
    REFRESH_TOKEN_EXPIRED: 'refresh token expired',
  },
  links: {
    termsAndConditions:
      '',
    privacyPolicy: '',
    faq: '',
    appStore: '',
    playStore:
      '',
  },
  google: {
    webClientId:
      "1053915587996-872jpn1js24c5gi8h89o54qja4nsrack.apps.googleusercontent.com",
  },
  mapStyle: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e9e9e9',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dedede',
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          saturation: 36,
        },
        {
          color: '#333333',
        },
        {
          lightness: 40,
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f2f2f2',
        },
        {
          lightness: 19,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 17,
        },
        {
          weight: 1.2,
        },
      ],
    },
  ],
  toastVisibilityTime: 3000,
  defaultExtras: {
    // AIRPORT_TRANSFER: {
    //   title: 'Airport Transfers',
    //   type: 'AIRPORT_TRANSFER',
    //   icon: props => <Airplane {...props} />,
    //   tileBg: tw.style('bg-primitive-blue-400'),
    // },
    // EARLY_CHECKIN: {
    //   title: 'Request Early Check-in',
    //   type: 'EARLY_CHECKIN',
    //   icon: props => <Sun {...props} />,
    //   tileBg: tw.style('bg-primitive-orange-400'),
    // },
    // LATE_CHECKOUT: {
    //   title: 'Request Late Check-out',
    //   type: 'LATE_CHECKOUT',
    //   icon: props => <Moon {...props} />,
    //   tileBg: tw.style('bg-primitive-yellow-400'),
    // },
    // APARTMENT_TRANSFER: {
    //   title: 'Apartment Transfers',
    //   type: 'APARTMENT_TRANSFER',
    //   icon: props => <Home {...props} />,
    //   tileBg: tw.style('bg-primitive-blue-400'),
    // },
    // EXTRA_HOUSEKEEPING: {
    //   title: 'Request Extra Cleaning',
    //   type: 'EXTRA_HOUSEKEEPING',
    //   icon: props => <Broom {...props} />,
    //   tileBg: tw.style('bg-primitive-yellow-400'),
    // },
  } satisfies {
    // [key in keyof IExtraType]: {
    //   type: IExtraType[keyof IExtraType];
    //   title: string;
    //   icon: (props?: {
    //     width?: number;
    //     height?: number;
    //     color?: string;
    //   }) => React.ReactNode;
    //   tileBg: Style;
    // };
  },
  times: {
    lateCheckout: DateTime.fromObject({ hour: 14, minute: 1 }),
  },
  sentryDSN:
    'https://992fa808f153396ee6102d707235a2f6@o4511252530069504.ingest.us.sentry.io/4511252532428800',
  reviewUser: {
    id: '',
    phoneNo: '',
    deviceID: '',
    pin: '',
  },
  contactInfo: {
    email: '',
  },
};
