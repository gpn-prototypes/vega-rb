import React from 'react'
import Input from '../Input'

interface IProps {
    name: string
    idx: number
    setColumnProps: Function
    onBlurHandler: Function
}

export const InputEditor = ({
    name,
    idx,
    setColumnProps,
    onBlurHandler,
}: IProps) => (
    <Input
        value={name}
        onKeyPress={(event: any) => {
            if (event.key === 'Enter') {
                setColumnProps(idx, 'isRenaming', false)
            }
        }}
        onBlur={() => onBlurHandler(idx)}
        onChange={({ target }: { target: HTMLInputElement }) => {
            const value = target.value
            if (value) {
                setColumnProps(idx, 'name', value)
            }
        }}
    />
)
