import React from 'react'

interface AvatarLetterProps {
  name: string
  className?: string
}

const UiAvatarLetter: React.FC<AvatarLetterProps> = ({ name, className }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ')
    return names.map((n) => n.charAt(0).toUpperCase()).join('')
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-300 ${className}`}
      style={{ width: '50px', height: '50px' }}
    >
      <span className="font-bold text-white">{getInitials(name)}</span>
    </div>
  )
}

export default UiAvatarLetter
