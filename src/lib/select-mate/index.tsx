import { ReactElement, SelectHTMLAttributes, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
// Components
import { ContainerListOptions } from './components/container-list-options'
import { ContainerSelectMate } from './components/container-select-mate'
import { IconArrow } from './components/icon-arrow'
import { SelectNative } from './select'
import TextSelectOption from './components/text-selected-option'

import { theme } from './commons/theme'
import { useGetDefaultOption } from './hooks/useGetDefaultOption'

import { OptionI } from './select-mate.types'

export interface SelectMateProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactElement[]
  options: OptionI[]
  defaultTextProp?: string
  className?: string
  defaultValueProp?: string
  onChange?: (value: string | unknown) => void
}

const SelectMate = ({ className, children, onChange, options, defaultTextProp, defaultValueProp }: SelectMateProps) => {
  const idSelectedString = 'select-mate-selected-option'
  const { value: defaultText, setValue: setDefaultText } = useGetDefaultOption(
    children,
    options,
    defaultValueProp,
    defaultTextProp,
  )
  const [isActive, setIsActive] = useState(false)
  const [indexSelected, setIndexSelected] = useState(0)

  const selectUID = '853f02jBYSd5uGnGpkFV'

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if ((event.srcElement as HTMLElement).id === idSelectedString) {
        setIsActive(!isActive)
      } else {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive])

  function selectOption(indx: number, label: string) {
    setIndexSelected(indx)
    setDefaultText(label)
  }

  return (
    <ThemeProvider theme={theme}>
      <ContainerSelectMate className={`${className}`} role="select-mate" data-selec-open={isActive}>
        <SelectNative
          uid={selectUID}
          indexSelected={indexSelected}
          defaultValue={defaultValueProp}
          onChange={(label: string, indx: number) => {
            if (onChange) {
              onChange(options[indx].value)
            }
            selectOption(indx, label)
          }}
          options={options}
        />
        <TextSelectOption id={idSelectedString}>{defaultText}</TextSelectOption>
        <IconArrow isActive={isActive} />
        <ContainerListOptions
          selectOption={(indx, label) => selectOption(indx, label)}
          options={options}
          isActive={isActive}
        ></ContainerListOptions>
      </ContainerSelectMate>
    </ThemeProvider>
  )
}

export default SelectMate
