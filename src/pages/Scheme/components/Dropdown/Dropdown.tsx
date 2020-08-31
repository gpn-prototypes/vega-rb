import * as React from 'react'
import classNames from 'classnames'
import { ReactNode } from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import { Maybe } from 'monet'
import style from './Dropdown.module.css'

export interface DropdownProps<T> {
    label?: string
    hasError?: boolean
    disabled?: boolean
    errorText?: string
    options: Array<Option<T>>
    small?: boolean
    value: Maybe<Option<T>>
    onChange: (option: Option<T>) => void
    optionRenderer?: (option: Option<T>) => ReactNode
    className?: string
    optionsWidth?: number
    fieldName?: string
}

interface DropdownState {
    showDropdown: boolean
}

export class Option<T> {
    constructor(readonly value: T, readonly label: string) {}

    static labelAccessor<V>(option: Option<V>) {
        return option.label
    }
}

export class Dropdown<T extends string | number> extends React.PureComponent<
    DropdownProps<T>,
    DropdownState
> {
    state: DropdownState = {
        showDropdown: false,
    }

    private dropdownRef = React.createRef<HTMLDivElement>()

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }

    private handleChange = (option: Option<T>) => {
        this.setState({ showDropdown: false })
        this.props.onChange(option)
    }

    private handleClickOutside = (event: MouseEvent) => {
        if (!this.dropdownRef.current!.contains(event.target as Node)) {
            this.setState({ showDropdown: false })
        }
    }

    private toggle = () => {
        if (this.props.disabled) return
        this.setState({
            showDropdown:
                this.props.options.length > 0 && !this.state.showDropdown,
        })
    }

    private renderOption = (option: Option<T>) => {
        const { optionRenderer = Option.labelAccessor } = this.props

        if (option.value === 'delimeter') {
            return (
                <li
                    className={style.Delimeter}
                    key={option.value.toString() + option.label}
                />
            )
        }

        return (
            <li
                className={style.DropdownOption}
                onClick={() => this.handleChange(option)}
                key={option.value.toString() + option.label}
            >
                {optionRenderer(option)}
            </li>
        )
    }

    public render() {
        const { showDropdown } = this.state
        const {
            options,
            className,
            label,
            value,
            hasError,
            disabled,
            errorText,
            fieldName = '',
            small = false,
            optionsWidth = '100%',
        } = this.props
        const displayValue = value.map((v) => v.label).getOrElse('')

        return (
            <div
                className={classNames(style.Dropdown, className, {
                    [style.DropdownSmall]: small,
                })}
                ref={this.dropdownRef}
                data-test={fieldName}
            >
                {label && <div className="form__label">{label}</div>}
                <div
                    className={classNames(style.DropdownSelected, {
                        [style.open]: showDropdown,
                        [style.Small]: small,
                        [style.Disabled]: disabled,
                    })}
                    onClick={this.toggle}
                >
                    <span>{displayValue}</span>
                    <div
                        className={classNames(style.Icon, {
                            [style.Rotate]: showDropdown,
                        })}
                    />
                </div>
                {hasError && (
                    <div className="form__error-text">{errorText}</div>
                )}
                <CSSTransition
                    classNames={{
                        enter: style.DropdownOptionsAnimationEnter,
                        enterActive: style.DropdownOptionsAnimationEnterActive,
                        exit: style.DropdownOptionsAnimationExit,
                        exitActive: style.DropdownOptionsAnimationExitActive,
                    }}
                    in={this.state.showDropdown}
                    timeout={100}
                    unmountOnExit={true}
                >
                    <div
                        className={classNames(style.DropdownOptionsContainer)}
                        style={{ width: optionsWidth }}
                    >
                        <ul className={style.DropdownOptions}>
                            {options.map(this.renderOption)}
                        </ul>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}
