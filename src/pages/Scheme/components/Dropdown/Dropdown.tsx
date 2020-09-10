/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/no-noninteractive-element-interactions */
import React, { ReactNode } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import classNames from 'classnames';
import { Maybe } from 'monet';

import { Option } from './Option';

import style from './Dropdown.module.css';

export interface DropdownProps<T> {
  options: Array<Option<T>>;
  value: Maybe<Option<T>>;
  onChange: (option: Option<T>) => void;
  label?: string;
  hasError?: boolean;
  disabled?: boolean;
  errorText?: string;
  small?: boolean;
  optionRenderer?: (option: Option<T>) => ReactNode;
  className?: string;
  optionsWidth?: number;
  fieldName?: string;
}

interface DropdownState {
  showDropdown: boolean;
}

export class Dropdown<T extends string | number> extends React.PureComponent<
  DropdownProps<T>,
  DropdownState
> {
  // eslint-disable-next-line
  state: DropdownState = {
    showDropdown: false,
  };

  private dropdownRef = React.createRef<HTMLDivElement>();

  // eslint-disable-next-line
  componentWillMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private handleChange = (option: Option<T>): void => {
    this.setState({ showDropdown: false });
    this.props.onChange(option);
  };

  private handleClickOutside = (event: MouseEvent): void => {
    if (!this.dropdownRef.current!.contains(event.target as Node)) {
      this.setState({ showDropdown: false });
    }
  };

  private toggle = (): void => {
    if (this.props.disabled) return;
    this.setState((prevState) => ({
      showDropdown: this.props.options.length > 0 && !prevState.showDropdown,
    }));
  };

  private renderOption = (option: Option<T>): JSX.Element => {
    const { optionRenderer = Option.labelAccessor } = this.props;

    if (option.value === 'delimeter') {
      return (
        <li
          className={style.Delimeter}
          key={option.value.toString() + option.label}
        />
      );
    }

    return (
      <li
        className={style.DropdownOption}
        onClick={(): void => this.handleChange(option)}
        key={option.value.toString() + option.label}
      >
        {optionRenderer(option)}
      </li>
    );
  };

  public render(): ReactNode {
    const { showDropdown } = this.state;
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
    } = this.props;
    const displayValue = value.map((v) => v.label).getOrElse('');

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
        {hasError && <div className="form__error-text">{errorText}</div>}
        <CSSTransition
          classNames={{
            enter: style.DropdownOptionsAnimationEnter,
            enterActive: style.DropdownOptionsAnimationEnterActive,
            exit: style.DropdownOptionsAnimationExit,
            exitActive: style.DropdownOptionsAnimationExitActive,
          }}
          in={this.state.showDropdown}
          timeout={100}
          unmountOnExit
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
    );
  }
}
