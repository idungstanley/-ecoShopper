'use client'
import { Listbox, Transition } from '@headlessui/react'
import { ChangeEvent } from 'react'
import { LuChevronDown } from 'react-icons/lu'

export function SelectDropdown({
  data,
  value,
  placeholder,
  showPlaceholder = true,
  customClasses = 'h-10 w-[70%]',
  handleSelect,
}: {
  placeholder?: string
  data: any[]
  showPlaceholder?: boolean
  value: string
  customClasses?: string
  handleSelect?: (e: ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <div
      className={`text-base cursor-pointer relative min-w-[150px]  pt-0 items-center text-white ${customClasses}`}
    >
      <select
        required
        id="countries"
        className="bg-[#22242A] border w-full rounded-lg p-2 border-[#2C3034] outline-none focus:outline-none !text-white"
        defaultValue={placeholder}
        onChange={handleSelect}
      >
        {showPlaceholder && (
          <option value="" className="">
            {placeholder}
          </option>
        )}
        {data.map((item, index) => (
          <option key={index} value={item[value]}>
            {item[value].toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}
