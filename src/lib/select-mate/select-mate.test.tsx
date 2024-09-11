import '@testing-library/jest-dom/vitest'
import { beforeEach, it, expect, describe } from 'vitest'

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import SelectMate from '.'

const options = [
  {
    value: 1,
    label: 'Opcion 1',
    selected: false,
  },
  {
    value: 2,
    label: 'Opcion 2',
    selected: false,
  },
  {
    value: 3,
    label: 'Opcion 5',
    selected: false,
  },
]

describe('Test SelectMate component ', () => {
  beforeEach(() => {
    render(<SelectMate options={options} />)
  })

  it('Check is show valid', () => {
    expect(screen.findByLabelText('Select an Option'))
  })

  it('Check is change the option', async () => {
    userEvent.click(screen.getByRole('select-mate'))
    userEvent.click(screen.getByRole('select-mate-option-1'))
    expect(screen.findByLabelText(/Opcion 2/))
  })

  it('Check is change the option again', async () => {
    userEvent.click(screen.getByRole('select-mate'))
    userEvent.click(screen.getByRole('select-mate-option-2'))
    expect(screen.findByLabelText(/Opcion 6/))
  })
})
