import Image from 'next/image'
import { useState, useMemo } from 'react'
import { imgUrl } from './constants'

export const useIsHidden = () => {
  const [isHidden, setisHidden] = useState(true)
  return useMemo(() => {
    const handleShowScript = () => setisHidden(h => !h)
    const HiddenIcon = () => (
      <span onClick={handleShowScript} className="flex items-center cursor-pointer">
        <Image
          loading="lazy"
          src={`${imgUrl}show-more.svg`}
          width="17"
          height="17"
          alt="toggle"
          layout="fixed"
          className={isHidden ? undefined : 'transform rotate-180'}
        />
      </span>
    )
    return [isHidden, HiddenIcon] as [boolean, () => JSX.Element]
  }, [isHidden, setisHidden])
}
