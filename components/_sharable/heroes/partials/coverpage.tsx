import Image from 'next/image'

interface CoverPageProps {
  title: string
  subtitle: string
  description: string
  getstarted: string
  buynow: string
  availbale: string
  rightcontent: JSX.Element
}

export default function CoverPage(props: CoverPageProps) {
  return (
    <div className="container mx-auto text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="col-span-1 px-14 py-32 relative z-20">
          <div className="flex flex-row items-center pb-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-24 sm:w-[100px] sm:h-[100px]"
            />
            <div className="ml-0 sm:ml-4">
              <h1 className="text-5xl sm:text-6xl  font-bold">{props.title}</h1>
            </div>
          </div>
          <div className="h-0.5 w-full bg-white opacity-50"></div>
          <div className="w-full">
            <p className="text-center sm:text-left text-2xl sm:text-4xl font-semibold py-4 shadow-lg space-y-4">
              {props.subtitle}
            </p>
            <p className="text-white text-center sm:text-left  font-medium text-medium sm:w-full sm:w-[90%] ">
              {props.description}
            </p>
            <div className="mt-7 flex justify-center sm:justify-start sm:items-center items-center gap-5">
              <button className="text-black bg-primary py-4 px-7 hover:bg-primary/80 font-medium rounded-lg text-sm text-center">
                <span className="shadow-lg">{props.getstarted}</span>
              </button>
              <button className="text-white border border-primary py-4 px-10 hover:bg-primary/80 font-medium rounded-lg text-sm text-center hover:bg-primary hover:text-black">
                {props.buynow}
              </button>
            </div>
            <div className="text-white py-5 text-center sm:text-left">
              Available on: <span>{props.availbale}</span>,
            </div>
          </div>
        </div>
        <div className="w-full h-full z-20 ">
          <div className="">{props.rightcontent}</div>
        </div>
      </div>
    </div>
  )
}
