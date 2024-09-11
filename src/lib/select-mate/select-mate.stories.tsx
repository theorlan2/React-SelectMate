import React from 'react'
import { Meta, Story } from '@storybook/react'
import SelectMate, { SelectMateProps } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<SelectMateProps> = {
  title: 'Components/Atoms/SelectMate',
  component: SelectMate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
}
export default meta

const Template: Story<SelectMateProps> = (args) => <SelectMate {...args} />

export const Basic = Template.bind({})
Basic.args = {
  options: [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ],
  defaultTextProp: 'Select an option',
}
