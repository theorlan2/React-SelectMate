import { ChangeEvent, FC, useEffect, useRef } from 'react'

import styled from 'styled-components'

import { OptionI } from './select-mate.types'

export const Select = styled.select`
  position: absolute;
  overflow: hidden;
  height: 0px;
  opacity: 0;
  z-index: -1;

  @media (max-width: 464px) {
    height: 100%;
    width: 100%;
    opacity: 0.01;
    z-index: 1;
  }
`

type Props = {
  uid: string
  indexSelected: number
  defaultValue: string | undefined
  options: OptionI[]
  onChangeEvent?: (event: ChangeEvent<{ selectedIndex: number }>) => void
  onChange: (label: string, index: number) => void
}

export const SelectNative: FC<Props> = (props) => {
  const selectRef = useRef(null as unknown as HTMLSelectElement)
  function changeEvent(event: ChangeEvent<{ selectedIndex: number }>) {
    if (event && event.target) {
      const indx = event.target.selectedIndex
      changeOption(indx)
    }
  }

  function changeOption(index: number) {
    const select_options = selectRef.current && selectRef.current.options
    select_options[index].selected = true
    props.onChange(props.options[index].label, index)
  }

  useEffect(() => {
    selectRef.current.selectedIndex = props.indexSelected
  }, [props.indexSelected])

  return (
    <Select
      ref={selectRef}
      id={props.uid}
      defaultValue={props.defaultValue}
      onChange={(evento: ChangeEvent<{ selectedIndex: number }>) => {
        changeEvent(evento)
      }}
    >
      {props.options.map((_option, indx) => (
        <option key={`option-${indx}`} value={_option.value}>
          {_option.label}
        </option>
      ))}
    </Select>
  )
}
