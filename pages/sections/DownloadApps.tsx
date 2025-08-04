import UiCard from '@/components/cards/Uicard1'
import ButtonBorder from '@/components/_sharable/buttons/ButtonBorder'
import Image from 'next/image'
import { IconDeviceDesktopDown, IconDeviceMobileDown } from '@tabler/icons-react'

const pageContent = [
  {
    title: 'Download our apps',
    description: 'Explore our innovative apps designed to enhance your experience. Download now to enjoy seamless access to our services and features right at your fingertips! If you need any adjustments or further details, just let me know!',
    donwloadLabel: [
      {
        icon: IconDeviceMobileDown,
        subtitle: 'Mobile App',
        buttonLabel: 'Download Now',
      },
      {
        icon: IconDeviceDesktopDown,
        subtitle: 'Desktop App',
        buttonLabel: 'Download Now',
      }
    ]
  }
]

const cards = [
  {
    title: 'Android',
    description: 'Mobile App',
    buttonLabel: 'Learn More',
    image: '/assets/mobile.png',
    width: 320,
    height: 100,
    className:'mt-5 ml-14 mt-14 sm:mt-0 sm:ml-5'
  },
  {
    title: 'Windows',
    description: 'Desktop App',
    buttonLabel: 'Learn More',
    image: '/assets/laptop.png',
    width: 500,
    height: 400,
    className: 'w-full h-72 mt-10 sm:mt-3 -rotate-12 -ml-3'
  }
]

export default function DownloadApps() {
  return (
    <div className="py-6">
      <div className='grid grid-cols-1 sm:grid-cols-3'>
        <div className='py-10 text-white'>
        {pageContent.map((content) => (
          <div key={content.title}>
            <h1 className='text-3xl font-bold'>{content.title}</h1>
            <p className='mt-3'>{content.description}</p>
            {content.donwloadLabel.map((label, index) => (
              <div className='py-4' key={index}>
                <p className='text-white text-xl py-2 flex items-center gap-2'> <label.icon /> {label.subtitle}</p>
                <ButtonBorder>{label.buttonLabel}</ButtonBorder>
              </div>
            ))}  
          </div>
        ))}
        </div>
        <div className='col-span-1 sm:col-span-2'>
          <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          {cards.map((card, index) => (
            <UiCard
              key={index}
              title={card.title}
              description={card.description}
              buttonLabel={<ButtonBorder>{card.buttonLabel}</ButtonBorder>}
            >
              <div>
                <Image
                  src={card.image}
                alt="logo"
                width={card.width}
                height={card.height}
                className={card.className}
              />
            </div>
        </UiCard>
     ))} 
          </div>
      </div>
    
      </div>
      <div className='w-full h-0.5 opacity-50 bg-[#245C5B] mt-2'></div>
    </div>
  )
}
