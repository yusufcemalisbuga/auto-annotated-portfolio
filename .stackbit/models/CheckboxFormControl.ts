import { Model } from '@stackbit/types';

// Constants
const FIELD_GROUPS = {
  STYLES: 'styles',
  SETTINGS: 'settings'
} as const;

const WIDTH_OPTIONS = {
  FULL: 'full',
  HALF: '1/2'
} as const;

const DEFAULTS = {
  NAME: 'updates',
  LABEL: 'Sign me up to receive updates',
  WIDTH: WIDTH_OPTIONS.FULL,
  IS_REQUIRED: false
} as const;

// Types
type WidthOption = typeof WIDTH_OPTIONS[keyof typeof WIDTH_OPTIONS];

/**
 * Checkbox Form Control Model
 * A reusable checkbox component for forms with customizable styling and validation
 */
export const CheckboxFormControlModel: Model = {
  type: 'object',
  name: 'CheckboxFormControl',
  label: 'Checkbox',
  labelField: 'label',
  
  fieldGroups: [
    {
      name: FIELD_GROUPS.STYLES,
      label: 'Styles',
      icon: 'palette'
    },
    {
      name: FIELD_GROUPS.SETTINGS,
      label: 'Settings',
      icon: 'gear'
    }
  ],
  
  fields: [
    // Core Fields
    {
      type: 'string',
      name: 'name',
      label: 'Name',
      default: DEFAULTS.NAME,
      required: true,
      description: 'Must be unique - this is the property name that will be sent to the server with this field\'s value.',
      validation: {
        pattern: '^[a-zA-Z][a-zA-Z0-9_]*$',
        message: 'Name must start with a letter and contain only letters, numbers, and underscores'
      }
    },
    {
      type: 'string',
      name: 'label',
      label: 'Label',
      default: DEFAULTS.LABEL,
      description: 'The text displayed next to the checkbox'
    },
    
    // Style Fields
    {
      type: 'enum',
      name: 'width',
      group: FIELD_GROUPS.STYLES,
      label: 'Width',
      options: [
        {
          label: 'Full Width',
          value: WIDTH_OPTIONS.FULL
        },
        {
          label: 'Half Width',
          value: WIDTH_OPTIONS.HALF
        }
      ],
      default: DEFAULTS.WIDTH,
      required: true,
      description: 'Controls the width of the checkbox field in the form layout'
    },
    
    // Settings Fields
    {
      type: 'boolean',
      name: 'isRequired',
      group: FIELD_GROUPS.SETTINGS,
      label: 'Required Field',
      default: DEFAULTS.IS_REQUIRED,
      description: 'When enabled, the form cannot be submitted without checking this box'
    }
  ]
} as const;

// Optional: Export types for use in components
export type CheckboxFormControl = {
  name: string;
  label?: string;
  width: WidthOption;
  isRequired: boolean;
};
