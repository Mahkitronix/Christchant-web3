import Image from 'next/image'

export default function UiHeroCard() {
  return (
    <div className="w-full h-full py-24 ml-8 flex items-center justify-center">
      <Image
        src="/cards/card1.svg"
        alt="logo"
        width={450}
        height={450}
        className="opacity-50 w-w-full h-full"
      />
    </div>
  )
}
