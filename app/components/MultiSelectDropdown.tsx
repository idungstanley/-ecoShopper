'use client'

import { useState, useEffect, useRef, ChangeEvent, SetStateAction } from 'react'
import { UserProps } from '../features/auth/auth.interface'

interface MultiSelectDropdownProps {
  formFieldName: string
  options: UserProps[]
  selectedOptions: UserProps[]
  setSelectedOptions: React.Dispatch<SetStateAction<UserProps[]>>
  onChange: (selectedOptions: UserProps[]) => void
}

export default function MultiSelectDropdown({
  formFieldName,
  options,
  onChange,
  selectedOptions,
  setSelectedOptions,
}: MultiSelectDropdownProps) {
  const optionsListRef = useRef<HTMLUListElement>(null)
  const [isJsEnabled, setIsJsEnabled] = useState(false)

  useEffect(() => {
    setIsJsEnabled(true)
  }, [])

  const isSelectAllEnabled = selectedOptions.length < options.length
  const isClearSelectionEnabled = selectedOptions.length > 0

  const handleSelectAllClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (optionsListRef.current) {
      const optionsInputs = optionsListRef.current.querySelectorAll<
        HTMLInputElement
      >('input')
      optionsInputs.forEach((input) => {
        input.checked = true
      })
    }

    setSelectedOptions([...options])
    onChange([...options])
  }

  const handleClearSelectionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()

    if (optionsListRef.current) {
      const optionsInputs = optionsListRef.current.querySelectorAll<
        HTMLInputElement
      >('input')
      optionsInputs.forEach((input) => {
        input.checked = false
      })
    }

    setSelectedOptions([])
    onChange([])
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    const optionId = e.target.value
    const option = options.find((opt) => opt.fullName === optionId)

    if (!option) {
      return
    }

    const selectedOptionSet = new Set(selectedOptions)

    if (isChecked) {
      selectedOptionSet.add(option)
    } else {
      selectedOptionSet.delete(option)
    }

    const newSelectedOptions = Array.from(selectedOptionSet)

    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  return (
    <label className="montserrat-1">
      <div className="bg-white text-black transition-opacity w-[200px]">
        <ul ref={optionsListRef}>
          <li>
            <button
              onClick={handleSelectAllClick}
              disabled={!isSelectAllEnabled}
              className="w-full text-left px-2 py-1 mb-2 text-blue-600 disabled:opacity-50 border rounded-lg"
            >
              {'Select All'}
            </button>
          </li>
          <li>
            <button
              onClick={handleClearSelectionClick}
              disabled={!isClearSelectionEnabled}
              className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50 border rounded-lg"
            >
              {'Clear selection'}
            </button>
          </li>
          {options.map((option) => (
            <li key={option.id}>
              <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 rounded-md my-2 truncate [&:has(input:checked)]:bg-blue-200">
                <input
                  type="checkbox"
                  name={formFieldName}
                  value={option.fullName}
                  className="cursor-pointer"
                  onChange={handleChange}
                />
                <span className="ml-1 text-[15px]">{option.fullName}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </label>
  )
}
