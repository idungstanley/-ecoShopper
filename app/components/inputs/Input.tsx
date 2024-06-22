import { InputDataTypes } from '@/app/types'
import { MdOutlineError } from 'react-icons/md'
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

function Input({
  label,
  placeholder,
  hint,
  cornerHint,
  required,
  name,
  type = 'text',
  autoComplete,
  value,
  onChange,
  leadingIcon,
  trailingIcon,
  trailingClick,
  bgColor,
  borderRadius,
  height = 'h-12',
  isBorder = true,
  classes,
  onBlur,
  styles,
  width = 'w-full',
  labelClasses,
  isError,
  errorMessage,
  handleSelect,
  selectValue,
}: InputDataTypes) {
  const handleTrailingIconClick = () => {
    if (trailingClick) {
      trailingClick()
    }
  }

  return (
    <div className="relative w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <label
            htmlFor={name}
            className={`absolute top-2 z-10 left-3 px-1 text-sm transition-all transform -translate-y-2 bg-white ${
              value && !isError
                ? 'text-gray-500'
                : value && isError
                ? 'text-red-400'
                : 'opacity-0'
            } ${labelClasses}`}
          >
            {label} {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {cornerHint && (
            <span className="text-sm text-gray-500">{cornerHint}</span>
          )}
        </div>
      )}
      <div className="relative">
        {leadingIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
            {leadingIcon}
          </div>
        )}
        <input
          maxLength={2000}
          type={type}
          id={name}
          required={required}
          name={name}
          autoComplete={autoComplete}
          className={`appearance-none block ${width} px-4  ${
            leadingIcon && 'pl-8'
          } ${name == 'phoneNumber' && 'pl-[110px]'} ${
            trailingIcon && 'pr-10'
          } ${
            isBorder && !isError
              ? 'border border-gray-300 focus:border-primary-500 focus:outline-none'
              : isError
              ? 'border border-red-400 focus:outline-none'
              : 'border-transparent focus:border-transparent focus:ring-0 focus:outline-none'
          } ${
            borderRadius
              ? borderRadius
              : name === 'search' && !borderRadius
              ? 'rounded-md py-0.5'
              : 'rounded-md py-2'
          }  placeholder-gray-700   sm:text-sm ${bgColor} ${height} ${classes}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{ ...styles, fontSize: '13px' }}
        />
        {!trailingIcon &&
          !!value &&
          (isError ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <MdOutlineError className="text-red-500" />
            </div>
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FaCheckCircle className="text-green-600" />
            </div>
          ))}
        {trailingIcon && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={handleTrailingIconClick}
          >
            {trailingIcon}
          </div>
        )}
      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {isError && (
        <p className="text-brand-warning text-[10px]">{errorMessage}</p>
      )}
    </div>
  )
}

export default Input
