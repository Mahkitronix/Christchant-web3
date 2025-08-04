import React from 'react';
import Image from 'next/image';

export default function SliderImages({
  className,
  content = [],
  isImage = false,
}: {
  className?: string;
  content?: string[];
  isImage?: boolean;
}) {
  // Duplicate the content for infinite scrolling
  const duplicatedContent = [...content, ...content];

  return (
    <div className={`slider-wrapper ${className}`}>
      <div className="marquee">
        <div className="flex flex-row">
          {duplicatedContent.map((item, index) => (
            <div key={index} className="child mx-2"> {/* Add margin for spacing */}
              <div className="mb-8 h-32 w-32 items-center flex justify-center">
                {isImage && (
                  <Image
                    src={item}
                    width={200}
                    height={100}
                    className="child-image"
                    alt="slider"
                  />
                )}
                {!isImage && <p className="child-text">{item}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}