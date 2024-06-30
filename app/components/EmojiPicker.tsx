import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { useEffect, useRef } from 'react'

export const NewEmojiPicker = ({
  onClick,
  onEmojiSelect,
  height,
  width,
  position,
  openEmoji,
  toggleEmojiState,
}: {
  onClick: () => void
  height?: number
  position?: string
  width?: number
  toggleEmojiState?: React.Dispatch<React.SetStateAction<boolean>>
  openEmoji?: boolean
  onEmojiSelect: (emojiData: EmojiClickData, event: MouseEvent) => void
}) => {
  const emojiRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !((emojiRef.current as unknown) as Node).contains(event.target as Node)
      ) {
        // Clicked outside the dropdown, close it
        toggleEmojiState?.(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [emojiRef, toggleEmojiState])

  return (
    <div
      className={`absolute inset-0 flex justify-center items-center z-10 ${position}`}
      ref={emojiRef}
      // onClick={onClick}
    >
      <div className={`z-40`}>
        <EmojiPicker
          searchPlaceHolder="Search for you favorite emoji"
          width={width}
          height={height}
          theme={Theme.DARK}
          onEmojiClick={onEmojiSelect}
        />
      </div>
    </div>
  )
}
