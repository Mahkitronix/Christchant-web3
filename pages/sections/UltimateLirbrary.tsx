import Image from 'next/image'
import { useEffect, useState } from 'react'
import UiTimer from '@/components/_sharable/timer/UITimer'

const images = [
  {
    id: 1,
    src: '/images/bg1.png',
    alt: '1',
  },
  {
    id: 2,
    src: '/images/bg2.png',
    alt: '2',
  },
  {
    id: 3,
    src: '/images/bg3.png',
    alt: '3',
  },
  {
    id: 4,
    src: '/images/bg4.png',
    alt: '4',
  },
  {
    id: 5,
    src: '/images/bg5.png',
    alt: '5',
  },
  {
    id: 6,
    src: '/images/bg6.png',
    alt: '6',
  },
  {
    id: 7,
    src: '/images/bg7.png',
    alt: '7',
  },
  {
    id: 8,
    src: '/images/bg8.png',
    alt: '8',
  },
  {
    id: 9,
    src: '/images/bg9.png',
    alt: '9',
  },
  {
    id: 10,
    src: '/images/bg10.png',
    alt: '10',
  },
  {
    id: 11,
    src: '/images/bg11.png',
    alt: '11',
  },
  {
    id: 12,
    src: '/images/bg12.png',
    alt: '12',
  },
  {
    id: 13,
    src: '/images/bg13.png',
    alt: '13',
  },
  {
    id: 14,
    src: '/images/bg14.png',
    alt: '14',
  },
  {
    id: 15,
    src: '/images/bg15.png',
    alt: '15',
  },
  {
    id: 16,
    src: '/images/bg16.png',
    alt: '16',
  },
  {
    id: 17,
    src: '/images/bg17.png',
    alt: '17',
  },
  {
    id: 18,
    src: '/images/bg18.png',
    alt: '18',
  },
  {
    id: 19,
    src: '/images/bg19.png',
    alt: '19',
  },
  {
    id: 20,
    src: '/images/bg20.png',
    alt: '20',
  },
]

const pageContent = [
  {
    label: 'CristChant Pro',
    title: 'The Ultimate Media Libray',
    subtitle: 'Unlocks our 200 free assets today!',
    description: 'Experience a vast library of over 50,000 high-quality visuals, from breathtaking aerial shots to dynamic motion graphics, all designed to enhance your presentations and seamlessly integrate with ProPresenter for effortless media management.',
    donwloadLabel: [
      {
        buttonLabel: 'Subscribe Now',
      },
      {
        buttonLabel: 'View all Library',
      },
    ],
  },
]

export default function UltimateLirbrary() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayedImages = images.slice(currentIndex, currentIndex + 13)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 9)) // Loop back to the start
    }, 2000) // Change image every 3 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  return (
    <div className="bg-black h-auto pb-5 w-full overflow-hidden">
      <div className="bg-black w-full h-auto rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <div className="col-span-2 flex flex-col items-center justify-center relative">
            <h1 className="text-white text-3xl font-bold absolute z-10">
              Text Here or Song Lyrics
            </h1>
            <Image
              key={displayedImages[0].id}
              src={displayedImages[0].src}
              alt={displayedImages[0].alt}
              width={150}
              height={120}
              className="w-full h-80 sm:h-full transition-transform duration-300 rounded-lg"
            />
          </div>
          <div className="col-span-3 px-2 sm:px-0 -ml-2 sm:ml-0 rounded-lg flex justify-center items-center">
            <div className="grid grid-cols-8 sm:grid-cols-4 gap-1 sm:gap-2">
              {displayedImages.slice(1).map((image) => (
                <Image
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  width={100}
                  height={100}
                  className="w-full h-16 sm:h-32 transition-transform duration-300 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {pageContent.map((content, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-white py-4  py-1">
           <div className="col-span-2">
            <p className="text-xl font-light">{content.description}</p>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <h1 className="text-md font-light italic text-[#F2A847]">{content.label}</h1>
              <h4 className="text-xl font-semibold">{content.title}</h4>
              <p className="text-md font-light">{content.subtitle}</p>
              <div className="mt-2 flex gap-2">
               {content.donwloadLabel.map((label, buttonIndex) => (
                <button
                  key={buttonIndex}
                  className={`py-4 px-7 hover:bg-primary/80 font-medium rounded-lg text-sm text-center ${
                    buttonIndex === 0 ? 'text-black bg-primary' : 'text-white bg-transparent'
                  }`}
                >
                  {label.buttonLabel}
                </button>
              ))}
              </div>
            </div>
          </div>
          <div>
            <UiTimer/>
          </div>
         </div>
      ))}
        <div className='w-full h-0.5 opacity-50 bg-[#245C5B] mt-2'></div>
    </div>
  )
}
