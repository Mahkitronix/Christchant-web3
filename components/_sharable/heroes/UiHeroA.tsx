import UiHeroCard from './partials/card'
import UiHeroCoverPage from './partials/coverpage'

const items = [
  {
    title: 'Christ Chant',
    subtitle: ' Empowering your church!',
    description:
      'Innovative solutions and resources to enhance community engagement and spiritual growth.',
    getstarted: 'Get Started',
    buynow: 'Buy Now',
    availbale: 'Available on',
  },
]

export default function UiHeroA() {
  return (
    <div className="h-screen w-full relative pb-4 bg-black">
      <video
        className="absolute z-10 opacity-50 -top-22 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/videos/bg1.mp4" type="video/mp4" />
      </video>
      <UiHeroCoverPage
        title={items[0].title}
        subtitle={items[0].subtitle}
        description={items[0].description}
        getstarted={items[0].getstarted}
        buynow={items[0].buynow}
        availbale={items[0].availbale}
        rightcontent={
          <div className="sm:block hidden">
            <UiHeroCard />
          </div>
        }
      />
    </div>
  )
}
