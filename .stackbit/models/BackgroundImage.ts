import { Model } from '@stackbit/types';

// Constants
const FIELD_GROUPS = {
  STYLES: 'styles'
} as const;

const BACKGROUND_SIZE = {
  AUTO: 'auto',
  COVER: 'cover',
  CONTAIN: 'contain'
} as const;

const BACKGROUND_REPEAT = {
  REPEAT: 'repeat',
  REPEAT_X: 'repeat-x',
  REPEAT_Y: 'repeat-y',
  NO_REPEAT: 'no-repeat'
} as const;

const BACKGROUND_POSITION = {
  TOP: 'top',
  BOTTOM: 'bottom',
  CENTER: 'center',
  LEFT: 'left',
  RIGHT: 'right',
  LEFT_TOP: 'left-top',
  LEFT_BOTTOM: 'left-bottom',
  RIGHT_TOP: 'right-top',
  RIGHT_BOTTOM: 'right-bottom'
} as const;

const DEFAULTS = {
  IMAGE_URL: '/images/bg2.jpg',
  SIZE: BACKGROUND_SIZE.COVER,
  POSITION: BACKGROUND_POSITION.CENTER,
  REPEAT: BACKGROUND_REPEAT.NO_REPEAT,
  OPACITY: 100
} as const;

const OPACITY_CONFIG = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
  UNIT: '%'
} as const;

// Types
export type BackgroundSize = typeof BACKGROUND_SIZE[keyof typeof BACKGROUND_SIZE];
export type BackgroundPosition = typeof BACKGROUND_POSITION[keyof typeof BACKGROUND_POSITION];
export type BackgroundRepeat = typeof BACKGROUND_REPEAT[keyof typeof BACKGROUND_REPEAT];

export interface BackgroundImage {
  url?: string;
  backgroundSize: BackgroundSize;
  backgroundPosition: BackgroundPosition;
  backgroundRepeat: BackgroundRepeat;
  opacity?: number;
}

// Helper functions
const createPositionOptions = () => [
  { label: 'Top', value: BACKGROUND_POSITION.TOP },
  { label: 'Bottom', value: BACKGROUND_POSITION.BOTTOM },
  { label: 'Center', value: BACKGROUND_POSITION.CENTER },
  { label: 'Left', value: BACKGROUND_POSITION.LEFT },
  { label: 'Right', value: BACKGROUND_POSITION.RIGHT },
  { label: 'Left Top', value: BACKGROUND_POSITION.LEFT_TOP },
  { label: 'Left Bottom', value: BACKGROUND_POSITION.LEFT_BOTTOM },
  { label: 'Right Top', value: BACKGROUND_POSITION.RIGHT_TOP },
  { label: 'Right Bottom', value: BACKGROUND_POSITION.RIGHT_BOTTOM }
];

/**
 * Background Image Model
 * Configurable background image component with extensive styling options
 */
export const BackgroundImageModel: Model = {
  type: 'object',
  name: 'BackgroundImage',
  label: 'Background Image',
  labelField: 'url',
  
  fieldGroups: [
    {
      name: FIELD_GROUPS.STYLES,
      label: 'Styles',
      icon: 'palette'
    }
  ],
  
  fields: [
    // Core Field
    {
      type: 'image',
      name: 'url',
      label: 'Background Image',
      description: 'Select or upload a background image',
      default: DEFAULTS.IMAGE_URL,
      validation: {
        accept: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
        maxSize: 5242880, // 5MB
        message: 'Please upload an image file (JPEG, PNG, WebP, or SVG) under 5MB'
      }
    },
    
    // Style Fields
    {
      type: 'enum',
      name: 'backgroundSize',
      group: FIELD_GROUPS.STYLES,
      label: 'Image Size',
      description: 'How the background image should be sized',
      controlType: 'button-group',
      options: [
        {
          label: 'Auto',
          value: BACKGROUND_SIZE.AUTO,
          description: 'Original size'
        },
        {
          label: 'Cover',
          value: BACKGROUND_SIZE.COVER,
          description: 'Cover entire container'
        },
        {
          label: 'Contain',
          value: BACKGROUND_SIZE.CONTAIN,
          description: 'Fit within container'
        }
      ],
      default: DEFAULTS.SIZE,
      required: true
    },
    
    {
      type: 'enum',
      name: 'backgroundPosition',
      group: FIELD_GROUPS.STYLES,
      label: 'Image Position',
      description: 'Where the background image should be positioned',
      options: createPositionOptions(),
      default: DEFAULTS.POSITION,
      required: true
    },
    
    {
      type: 'enum',
      name: 'backgroundRepeat',
      group: FIELD_GROUPS.STYLES,
      label: 'Image Repeat',
      description: 'How the background image should repeat',
      controlType: 'button-group',
      options: [
        {
          label: 'No Repeat',
          value: BACKGROUND_REPEAT.NO_REPEAT,
          description: 'Display once'
        },
        {
          label: 'Repeat',
          value: BACKGROUND_REPEAT.REPEAT,
          description: 'Tile both directions'
        },
        {
          label: 'Repeat X',
          value: BACKGROUND_REPEAT.REPEAT_X,
          description: 'Tile horizontally'
        },
        {
          label: 'Repeat Y',
          value: BACKGROUND_REPEAT.REPEAT_Y,
          description: 'Tile vertically'
        }
      ],
      default: DEFAULTS.REPEAT,
      required: true
    },
    
    {
      type: 'number',
      name: 'opacity',
      group: FIELD_GROUPS.STYLES,
      label: 'Opacity',
      description: 'Transparency level of the background image',
      controlType: 'slider',
      min: OPACITY_CONFIG.MIN,
      max: OPACITY_CONFIG.MAX,
      step: OPACITY_CONFIG.STEP,
      unit: OPACITY_CONFIG.UNIT,
      default: DEFAULTS.OPACITY,
      displayCondition: 'url !== undefined'
    }
  ]
} as const;

// Utility function for CSS generation
export const generateBackgroundStyles = (bg: BackgroundImage): React.CSSProperties => ({
  backgroundImage: bg.url ? `url(${bg.url})` : undefined,
  backgroundSize: bg.backgroundSize,
  backgroundPosition: bg.backgroundPosition?.replace('-', ' '),
  backgroundRepeat: bg.backgroundRepeat,
  opacity: bg.opacity ? bg.opacity / 100 : 1
});
