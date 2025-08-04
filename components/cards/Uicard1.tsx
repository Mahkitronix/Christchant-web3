import Image from 'next/image'

interface Uicard1Props {
  children: any;
  title: string;
  description: string;
  buttonLabel: any;
}


export default function Uicard1({ children, title, description, buttonLabel }: Uicard1Props) {
  return (
    <div className="">
      <div className='relative text-white'>
        <div className='absolute top-0 left-0  flex justify-center'>
          {children}
        </div>
        <div className='absolute bottom-[24%] left-1/4 flex justify-start items-end text-xl'>
         {title}
        </div>
         <div className='absolute  flex justify-end bottom-[20.5%] sm:bottom-24 text-sm right-10 items-end'>
          {description}
        </div>
         <div className='absolute sm:bottom-5 bottom-8 right-20 sm:right-12 flex justify-end items-end'>
          {buttonLabel}
        </div>
        <Image
        src="/cards/card2.svg"
        alt="logo"
        width={450}
        height={450}
        className="opacity- z-10"
      />
     </div>
    </div>
  )
}
