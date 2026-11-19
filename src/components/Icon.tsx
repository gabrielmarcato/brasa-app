import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { ReactElement } from 'react';

export type IconName =
  | 'burger'
  | 'pizza'
  | 'chicken'
  | 'fries'
  | 'drink'
  | 'search'
  | 'sliders'
  | 'plus'
  | 'minus'
  | 'heart'
  | 'home'
  | 'tag'
  | 'receipt'
  | 'back'
  | 'close'
  | 'more'
  | 'star'
  | 'trash'
  | 'check'
  | 'phone'
  | 'chat'
  | 'arrow'
  | 'bike'
  | 'pin'
  | 'bag';

const glyphs: Record<IconName, ReactElement> = {
  burger: (
    <>
      <Path d="M3 10.5C3 6.4 7 3.5 12 3.5s9 2.9 9 7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
      <Rect x="2" y="13" width="20" height="2.6" rx="1.3" />
      <Path d="M3.5 17.2h17v.8a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18Z" />
    </>
  ),
  pizza: (
    <Path
      fillRule="evenodd"
      d="M12 21.5 3.2 6.6a1 1 0 0 1 .4-1.4 17.6 17.6 0 0 1 16.8 0 1 1 0 0 1 .4 1.4Zm-2.5-11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm4.6-2.2a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm-1.6 6.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"
    />
  ),
  chicken: (
    <Path d="M14.5 2.5a7 7 0 0 1 4.95 11.95c-1.9 1.9-4.5 2.3-6.7 1.4l-2.2 2.2a2.2 2.2 0 1 1-2.85 2.85A2.2 2.2 0 1 1 4.85 18l2.2-2.2c-.9-2.2-.5-4.8 1.4-6.7A7 7 0 0 1 14.5 2.5Z" />
  ),
  fries: (
    <>
      <Rect x="6.2" y="2.6" width="2" height="9" rx="1" transform="rotate(-10 7.2 7)" />
      <Rect x="9.6" y="1.5" width="2" height="10" rx="1" />
      <Rect x="12.8" y="2" width="2" height="9.5" rx="1" />
      <Rect x="15.9" y="2.8" width="2" height="9" rx="1" transform="rotate(10 16.9 7)" />
      <Path d="M4 9.5h16l-1.8 11a1.2 1.2 0 0 1-1.2 1H7a1.2 1.2 0 0 1-1.2-1Z" />
    </>
  ),
  drink: (
    <>
      <Path d="M13.6 1.6a.9.9 0 0 1 1.1-.6l3 .9a.9.9 0 1 1-.5 1.7l-2.2-.6-.9 3.5h-1.9Z" />
      <Rect x="3.5" y="7" width="17" height="2" rx="1" />
      <Path d="M5.6 10.5h12.8l-1.3 10a1.6 1.6 0 0 1-1.6 1.4H8.5a1.6 1.6 0 0 1-1.6-1.4Z" />
    </>
  ),
  search: (
    <Path
      fillRule="evenodd"
      d="M10.5 3a7.5 7.5 0 1 0 4.55 13.46l4.25 4.25a1.25 1.25 0 0 0 1.77-1.77l-4.25-4.25A7.5 7.5 0 0 0 10.5 3Zm0 2.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
    />
  ),
  sliders: (
    <>
      <Rect x="3" y="6" width="18" height="2.2" rx="1.1" />
      <Rect x="3" y="15.8" width="18" height="2.2" rx="1.1" />
      <Circle cx="8" cy="7.1" r="3" />
      <Circle cx="16" cy="16.9" r="3" />
    </>
  ),
  plus: (
    <>
      <Rect x="10.7" y="4" width="2.6" height="16" rx="1.3" />
      <Rect x="4" y="10.7" width="16" height="2.6" rx="1.3" />
    </>
  ),
  minus: <Rect x="4" y="10.7" width="16" height="2.6" rx="1.3" />,
  heart: <Path d="M12 20.6s-8.5-4.9-8.5-11a4.9 4.9 0 0 1 8.5-3.3 4.9 4.9 0 0 1 8.5 3.3c0 6.1-8.5 11-8.5 11Z" />,
  home: (
    <Path d="M12 3.2 2.9 10.9a1 1 0 0 0 .64 1.77H5V20a1 1 0 0 0 1 1h4v-5.5h4V21h4a1 1 0 0 0 1-1v-7.33h1.46a1 1 0 0 0 .64-1.77Z" />
  ),
  tag: (
    <Path
      fillRule="evenodd"
      d="M3 4.5A1.5 1.5 0 0 1 4.5 3h6.38a1.5 1.5 0 0 1 1.06.44l8.62 8.62a1.5 1.5 0 0 1 0 2.12l-6.38 6.38a1.5 1.5 0 0 1-2.12 0L3.44 11.94A1.5 1.5 0 0 1 3 10.88Zm4.5 1.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z"
    />
  ),
  receipt: (
    <Path
      fillRule="evenodd"
      d="M5 2.5h14a1 1 0 0 1 1 1V21l-2.5-1.5L15 21l-3-1.5L9 21l-2.5-1.5L4 21V3.5a1 1 0 0 1 1-1Zm3 4.5v1.8h8V7Zm0 4v1.8h8V11Zm0 4v1.8h5V15Z"
    />
  ),
  back: (
    <Path d="M14.6 4.4a1.3 1.3 0 0 1 0 1.84L8.84 12l5.76 5.76a1.3 1.3 0 1 1-1.84 1.84l-6.68-6.68a1.3 1.3 0 0 1 0-1.84l6.68-6.68a1.3 1.3 0 0 1 1.84 0Z" />
  ),
  close: (
    <Path d="M6.2 4.4 12 10.2l5.8-5.8a1.27 1.27 0 1 1 1.8 1.8L13.8 12l5.8 5.8a1.27 1.27 0 1 1-1.8 1.8L12 13.8l-5.8 5.8a1.27 1.27 0 1 1-1.8-1.8l5.8-5.8-5.8-5.8a1.27 1.27 0 1 1 1.8-1.8Z" />
  ),
  more: (
    <>
      <Circle cx="5" cy="12" r="2.2" />
      <Circle cx="12" cy="12" r="2.2" />
      <Circle cx="19" cy="12" r="2.2" />
    </>
  ),
  star: <Path d="m12 2.8 2.8 5.9 6.4.9-4.7 4.5 1.2 6.4L12 17.4l-5.7 3.1 1.2-6.4L2.8 9.6l6.4-.9Z" />,
  trash: (
    <Path d="M9 3h6l.8 1.5H20a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h4.2Zm-3.5 5h13l-1 11.6a2 2 0 0 1-2 1.9h-7a2 2 0 0 1-2-1.9Z" />
  ),
  check: <Path d="M9.4 17.6 4.6 12.8a1.3 1.3 0 0 1 1.84-1.84l2.96 2.96 8.16-8.16a1.3 1.3 0 0 1 1.84 1.84l-9.1 9.1a1.3 1.3 0 0 1-1.9.9Z" />,
  phone: (
    <Path d="M7.2 3h-2A2.2 2.2 0 0 0 3 5.3C3.4 14 10 20.6 18.7 21a2.2 2.2 0 0 0 2.3-2.2v-2a1.3 1.3 0 0 0-1-1.3l-3.3-.8a1.3 1.3 0 0 0-1.3.4l-1.2 1.4a12.5 12.5 0 0 1-5.9-5.9l1.4-1.2a1.3 1.3 0 0 0 .4-1.3L9.3 4A1.3 1.3 0 0 0 8 3Z" />
  ),
  chat: <Path d="M5 4h14a2 2 0 0 1 2 2v9.5a2 2 0 0 1-2 2H9.4l-4.6 3.4a.8.8 0 0 1-1.3-.64V6a2 2 0 0 1 2-2Z" />,
  arrow: (
    <Path d="M9.4 4.4a1.3 1.3 0 0 0 0 1.84L15.16 12 9.4 17.76a1.3 1.3 0 1 0 1.84 1.84l6.68-6.68a1.3 1.3 0 0 0 0-1.84L11.24 4.4a1.3 1.3 0 0 0-1.84 0Z" />
  ),
  bike: (
    <Path d="M5.5 11a4.5 4.5 0 1 0 4.4 5.5h3.1l2.4-6.1h1.6l.6 1.5a4.5 4.5 0 1 0 1.9-.5l-.9-2.4H15V7.5h2.2a1 1 0 0 0 0-2H13a1 1 0 0 0-1 1.4l.5 1.6H9.3A1 1 0 0 0 8.4 9l1 2.2A4.5 4.5 0 0 0 5.5 11Zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm13 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
  ),
  pin: (
    <Path
      fillRule="evenodd"
      d="M12 2a7 7 0 0 1 7 7c0 4.9-5.5 10.7-6.3 11.5a1 1 0 0 1-1.4 0C10.5 19.7 5 13.9 5 9a7 7 0 0 1 7-7Zm0 4.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"
    />
  ),
  bag: (
    <Path
      fillRule="evenodd"
      d="M8 7V6a4 4 0 0 1 8 0v1h2.2a1 1 0 0 1 1 .9l1 12a1 1 0 0 1-1 1.1H4.8a1 1 0 0 1-1-1.1l1-12a1 1 0 0 1 1-.9Zm2 0h4V6a2 2 0 1 0-4 0Z"
    />
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      {glyphs[name]}
    </Svg>
  );
}
