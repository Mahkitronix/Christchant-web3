import SliderImages from '@components/slider/SliderImages';

export default function MovingLogo() {
  const items = [
    '/logo/quicklee-bee.png',
    '/logo/neblent.png',
    '/logo.svg',
    '/logo/quicklee-bee.png',
    '/logo/quicklee-bee.png',
    '/logo/quicklee-bee.png',
  ];

  // Multiply items by 3
  const multipliedItems = [...items, ...items, ...items];

  return (
    <div className="relative bg-black h-44">
      <div className='pt-7'>
        <SliderImages
        className="mb-8"
        content={multipliedItems} // Use the multiplied items
        isImage={true}
      />
     </div>
    </div>
  );
}