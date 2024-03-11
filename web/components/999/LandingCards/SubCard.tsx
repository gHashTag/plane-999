import React from 'react'
import Image from 'next/image'
import LandingIcons from '@components/999/LandingCards/LandingIcons'


type SubCardProps = {
  title: string
  img: string
  onClick: () => void
}

const SubCard: React.FC<SubCardProps> = ({ title, img, onClick }) => {
  return (
    <a onClick={onClick}>
      <div className="border rounded-lg border-custom-1 p-4 flex flex-col cursor-pointer hover:bg-[#fff]/50 transition duration-300 ease-in-out">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <Image
            src={`/images/${img}`}
            alt={title ?? 'landing- card'}
            width={400}
            height={400}
            className="object-contain"
            style={{ marginBottom: '20px' }}
          />
        </div>
        <div className="flex items-center justify-center">{LandingIcons[title]}</div>
        <div className="flex items-center justify-center text-slate-400 text-base font-medium mt-2">{title}</div>
      </div>
    </a>
  )
}
export default React.memo(SubCard)
