export type OptionI<V = string | number | readonly string[] | undefined> = {
  value: V
  label: string
  selected?: boolean
}

export type ContainerListOptionsProps = {
  isActive: boolean
  options: OptionI[]
  selectOption: (indx: number, label: string) => void
}
