import { Button } from "@heroui/button"
import JoinNow from "./JoinNow"

const TopQuestions = [
  {
    id:1,
    question: "What is Christchant?",
  },
  {
    id:2,
    question: "How do I create a new presentation for Sunday service?",
  },
  {
    id:3,
    question: "Can I import my existing slides into the app?",
  },
  {
    id:4,
    question: "How do I add song lyrics to my presentation?",
  },
  {
    id:5,
    question: "Can I include videos and images in my slides?",
  },
  {
    id:6,
    question: "Is it possible to display Bible verses dynamically?",
  },
  {
    id:7,
    question: "How do I customize the templates for different church events?",
  },
  {
    id:8,
    question: "How do I connect the app to the church's projector system?",
  },
  {
    id:9,
    question: "Are there any pre-designed templates available in the app?",
  }
]

export default function Questions() {
  return (
    <div className="relative bg-black h-64 sm:h-[90%] bg-gradient-to-b p-4 from-[#315467] to-[#000000] rounded-lg">
      <div className="bg-black h-64 sm:h-full p-10 bg-gradient-to-b from-[#000000] to-[#000000] rounded-lg">
          <div className="grid grid-cols-5">
        <div className="col-span-3 flex flex-col  p-2">
        <h1 className="text-white text-3xl font-semibold text-center sm:text-left">
          Questions?
        </h1>
        <h5 className="text-white text-base sm:text-xl w-full sm:w-[80%] py-2 ">
          We`re here to help! If you have any questions or need assistance, our
          team is always ready to respond. We`re committed to providing the
          best support possible, so don`t hesitate to reach out.
            </h5>
            <div className="mt-5">
               <Button className="bg-[#315467] rounded-lg">
            Help Center
              </Button>
              <a href="" className="text-white ml-3">Contact Support</a>
         </div>
        </div>
        <div className="col-span-2">
          <h1 className="text-white text-2xl font-medium text-center sm:text-left">
            Top Questions?
          </h1>
          {TopQuestions.map((item) => (
          <div key={item.id} className="mt-3">
            <h5 className="text-white text-sm sm:text-md w-full sm:w-full">
              {item.question}
            </h5>
          </div>
        ))}
          </div>
        </div>
      </div>
        <div className="absolute -bottom-20 left-0">
           <JoinNow />
       </div>

    </div>
  )
}