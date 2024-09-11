import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { useCallback } from 'react'

import { getChild, getFirstChild } from '../commons/utils'

import { OptionI } from '../select-mate.types'

export const useGetDefaultOption = (
  children: ReactNode,
  options: OptionI[],
  defaultValue?: string,
  defaultText?: string,
) => {
  const [optionResult, setOptionResult] = useState(defaultText || 'Select an option')

  const findChildrenOption = useCallback(
    (items: ReactElement<HTMLOptionElement>[]) => {
      return items.find(
        (item: ReactElement<HTMLOptionElement>) => item.props.value.toString() === defaultValue?.toString(),
      )
    },
    [defaultValue],
  )
  const findOption = useCallback(
    (items: OptionI[]) => {
      return items.find((item: OptionI) => (item.value && item.value.toString()) === defaultValue?.toString())
    },
    [defaultValue],
  )

  useEffect(() => {
    if (children && Array.isArray(children)) {
      const firstChild = getFirstChild(children)
      const result = findChildrenOption(children) || getChild(firstChild)
      setOptionResult(result)
    } else {
      const resultOption = findOption(options)
      if (resultOption) {
        setOptionResult(resultOption.label)
      }
    }
  }, [children, defaultValue, findChildrenOption, findOption, options])

  return { value: optionResult, setValue: setOptionResult }
}
