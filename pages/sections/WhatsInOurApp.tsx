import UiCard2 from "@/components/cards/UiCard2";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [
  {
    id: 1,
    title: "Song Lyrics and Chords",
    image: <Image src="/assets/church-presentation.png" alt="Church Presentation Software" width={120} height={120} className="w-96 h-44" />,
    description: "Song Lyrics and Chords is your ultimate resource for musicians and music enthusiasts.",
    buttonText: "Learn More",
    link: "#",
  },
  {
    id: 2,
    title: "Song Lyrics and Chords",
    image: <Image src="/assets/lyrics-chord.png" alt="Church Presentation Software" width={100} height={100} className="w-96 h-44" />,
    description: "Song Lyrics and Chords is your ultimate resource for musicians and music enthusiasts.",
    buttonText: "Learn More",
    link: "#",
  },
  {
    id: 3,
    title: "Song Lyrics and Chords",
    image: <Image src="/assets/team-chats.png" alt="Church Presentation Software" width={100} height={100} className="w-96 h-44" />,
    description: "Song Lyrics and Chords is your ultimate resource for musicians and music enthusiasts.",
    buttonText: "Learn More",
    link: "#",
  },
  {
    id: 4,
    title: "Song Lyrics and Chords",
    image: <Image src="/assets/church-finder.png" alt="Church Presentation Software" width={100} height={100} className="w-96 h-44" />,
    description: "Song Lyrics and Chords is your ultimate resource for musicians and music enthusiasts.",
    buttonText: "Learn More",
    link: "#",
  },
  {
    id: 5,
    title: "Song Lyrics and Chords",
    image: <Image src="/assets/slides-show.png" alt="Church Presentation Software" width={100} height={100} className="w-96 h-44" />,
    description: "Song Lyrics and Chords is your ultimate resource for musicians and music enthusiasts.",
    buttonText: "Learn More",
    link: "#",
  }
];
export default function WhatsInOurApp() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set the speed of autoplay (in milliseconds)
  };

  return (
    <div className="w-full h-auto text-white px-14 sm:p-4 bg-gradient-to-b from-[#000000] to-[#315467] pb-4 rounded-lg">
      <div className="flex items-center pb-4">
        <h1 className="text-3xl font-bold text-center">What`s In Our Apps</h1>
      </div>
      <div className="block sm:hidden">
        <Slider {...settings}>
          {items.map(item => (
            <UiCard2 
              key={item.id} 
              image={item.image} 
              number={item.id} 
              title={item.title} 
              description={item.description} 
              buttonText={<a className="hover:text-[#FFDA00]" href={item.link}>{item.buttonText}</a>} 
            />
          ))}
        </Slider>
      </div>
      <div className="hidden sm:grid grid-cols-1 gap-5 mt-5 sm:grid-cols-5">
        {items.map(item => (
          <UiCard2 
            key={item.id} 
            image={item.image} 
            number={item.id} 
            title={item.title} 
            description={item.description} 
            buttonText={<a className="hover:text-[#FFDA00]" href={item.link}>{item.buttonText}</a>} 
          />
        ))}
      </div>
    </div>
  );
}