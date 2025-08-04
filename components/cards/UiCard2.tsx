interface UiCard2Props {
  image: JSX.Element; // or string if it's a URL
  number: number;
  title: string;
  description: string;
  buttonText: any;
}

export default function UiCard2({ image, number, title, description, buttonText }: UiCard2Props) {
  return (
      <div className="bg-gradient-to-b from-[#315467] to-[#000000] hover:to-[#15252E]  backdrop-filter backdrop-blur rounded-lg shadow-2xl">
            <div className="rounded-t-lg">
                {image}
            </div>
            <div className="p-6"> 
                <div className="flex items-center gap-2">
                    <div className="bg-gray-700 w-12 h-8 rounded-full">
                        <div className="flex items-center justify-center h-8">
                            {number}
                        </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 text-white">{title}</h3>
                </div>
                <p className="mt-2 text-md text-gray-400">{description}</p>
                <button className="flex justify-end items-end text-white pt-5">{buttonText}</button>
            </div>
        </div>
    );
}