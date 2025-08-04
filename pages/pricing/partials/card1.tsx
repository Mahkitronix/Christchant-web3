export default function Card1({
  subtitle,
  dollar,
  price,
  suffix,
  button,
  children,
  href,
}: {
  subtitle: string
  dollar: string
  price: number
  suffix: string
  children: any
  button: any
  href?: string
}) {
  return (
    <div className="shadow-lg">
      <div className="bg-black py-3 border-primary-foreground-1 rounded-t-lg">
        <div className="text-center text-white text-3xl font-semibold ">
          <h1>{subtitle}</h1>
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-7 w-full bg-blue-500 z-10 h-7"></div>
        <div className="flex justify-center">
          <div className="bg-white shadow-lg py-6 w-[70%] z-20 rounded-lg">
            <h1 className="text-center text-black text-4xl font-bold">
              <span className="text-sm text-black">{dollar}</span>
              {price}
              <span className="text-sm text-black">{suffix}</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-auto">
        <div className="flex justify-center">
          <div className="w-full h-auto">
            <div className="py-12 flex justify-center w-full">
              <div className="grid grid-cols-4 gap-10 text-center text-lg">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-5">
        <a
          href={href}
          type="button"
          className="bg-[#F1A444] text-white py-3 px-2 w-[90%] rounded-lg text-center"
        >
          {button}
        </a>
      </div>
    </div>
  )
}
