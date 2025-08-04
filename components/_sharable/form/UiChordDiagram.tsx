import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectDarkMode } from '@/store/slices/ui.slice'
import Image from 'next/image'
import chordScreensImport from '@/https/data/chords/diagram-screens.json'
import chordDiagramImport from '@/https/data/chords/diagrams.json'
import chordMusicImport from '@/https/data/chords/chord-music.json'
import ChordsStyle from '@styles/chords.module.css'

interface ChordDiagramProps {
  chord: string
  onClose: () => void
}

const chordDiagram: any = chordDiagramImport as any
const chordMusic: any = chordMusicImport as any
const chordScreens: any = chordScreensImport as any

const dotColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']

const UiChordDiagram: React.FC<ChordDiagramProps> = ({ chord, onClose }) => {
  const [variation, setVariation] = useState<string>(() => {
    const variations = Object.keys(chordDiagram[chord] || {})
    return variations[0] || 'basic'
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isDarkMode = useSelector(selectDarkMode)
  const variations = Object.keys(chordDiagram[chord] || {})

  const handlePrevVariation = () => {
    const currentIndex = variations.indexOf(variation)
    const newIndex = currentIndex > 0 ? currentIndex - 1 : variations.length - 1
    setVariation(variations[newIndex])
  }

  const handleNextVariation = () => {
    const currentIndex = variations.indexOf(variation)
    const newIndex = currentIndex < variations.length - 1 ? currentIndex + 1 : 0
    setVariation(variations[newIndex])
  }

  const handlePlayChord = () => {
    // Attempt to get music for the current chord and variation
    const chordMusicUrl =
      chordMusic[chord]?.[variation] || chordMusic[chord]?.basic

    if (chordMusicUrl) {
      if (audioRef.current) {
        audioRef.current.src = `/${chordMusicUrl}` // Use public folder path
        audioRef.current.play()
        setIsPlaying(true)
      }
    } else {
      console.warn(
        `No music found for chord: ${chord}, variation: ${variation}`
      )
    }
  }

  // const handleStopChord = () => {
  //   if (audioRef.current) {
  //     audioRef.current.pause()
  //     audioRef.current.currentTime = 0
  //     setIsPlaying(false)
  //   }
  // }

  const handleAudioEnded = () => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  const currentVariationData = chordDiagram[chord]?.[variation] || {}
  const currentScreen = currentVariationData.screen || '0'
  const screenLabels = chordScreens[currentScreen] || []

  const diagramLines = screenLabels || []
  const dots = currentVariationData.dots
    ? currentVariationData.dots.filter(
        (dot: any) => dot.dot !== 0 || dot.fret !== 0
      )
    : []

  const deadString = currentVariationData.dead || ''
  const parsedDeadString = deadString
    .split(' ')
    .map((str: any, index: any) => ({
      string: index + 1,
      value: str === 'x' ? '×' : str === 'o' ? '○' : str,
    }))

  const backgroundClass = isDarkMode
    ? 'bg-gray-900 text-gray-100'
    : 'bg-white text-gray-900'

  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-500'

  const buttonClass = isDarkMode
    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-200'
    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'

  return (
    <div
      className={`fixed inset-0 ${isDarkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'} z-50 flex items-center justify-center`}
    >
      <div
        className={`${backgroundClass} ${borderClass} relative h-full w-96 rounded-lg border p-6 shadow-xl`}
      >
        <button
          onClick={onClose}
          className={`absolute right-2 top-2 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} p-2`}
        >
          ✕
        </button>
        <h3
          className={`pb-5 text-center text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
        >
          {chord} Chord
        </h3>
        <div className="absolute right-0 z-50 mr-1 mt-[20px] flex h-80 flex-col justify-between">
          {diagramLines.map((label: any, index: any) => (
            <div key={index} className="-ml-0 flex items-center justify-center">
              <span
                className={`mt-16 flex h-[10px] w-8 items-center justify-center ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="mb-4 grid grid-cols-6 gap-10">
          {parsedDeadString.map((str: any, index: any) => (
            <span
              key={index}
              className={`text-sm ${
                str.value === '×' || str.value === 'X'
                  ? 'font-bold text-white'
                  : isDarkMode
                    ? 'text-gray-300'
                    : 'text-gray-800'
              }`}
            >
              {str.value}
            </span>
          ))}
        </div>

        <div
          className={`h-80 w-[95%] border-b-5 border-t-5 bg-[#36220e] ${
            isDarkMode ? 'border-[#ababab]' : 'border-gray-500'
          } ${borderClass} relative`}
        >
          {parsedDeadString.map((str: any, index: any) =>
            str.value === '×' || str.value === 'X' ? (
              <div
                key={index}
                className={`${ChordsStyle.chordsBorder} z-20 ${
                  index === 0
                    ? 'ml-[0.5%]'
                    : index === 1
                      ? 'ml-[4.7%]'
                      : index === 2
                        ? 'ml-[9.1%]'
                        : index === 3
                          ? 'ml-[13.5%]'
                          : index === 4
                            ? 'ml-[18.1%]'
                            : 'ml-[22.5%]'
                } border-gray-500`}
                style={{ height: '53%' }}
              />
            ) : null
          )}
          <div
            className={`${ChordsStyle.chordsBorder} ml-[0.5%] border-red-200 ${borderClass}`}
          ></div>
          <div
            className={`${ChordsStyle.chordsBorder} ml-[4.7%] border-red-200 ${borderClass}`}
          ></div>
          <div
            className={`${ChordsStyle.chordsBorder} ml-[9.1%] border-red-200 ${borderClass}`}
          ></div>
          <div
            className={`${ChordsStyle.chordsBorder} ml-[13.5%] border-red-200 ${borderClass}`}
          ></div>
          <div
            className={`${ChordsStyle.chordsBorder} ml-[18.1%] border-red-200 ${borderClass}`}
          ></div>
          <div
            className={`${ChordsStyle.chordsBorder} ml-[22.5%] border-red-200 ${borderClass}`}
          ></div>
          <div
            className={`mt-[75px] h-0 w-full border-b-5 ${
              isDarkMode ? 'border-[#ababab]' : 'border-gray-500'
            } ${borderClass}`}
          ></div>
          <div
            className={`mt-[75px] h-0 w-full border-b-5 ${
              isDarkMode ? 'border-[#ababab]' : 'border-gray-500'
            } ${borderClass}`}
          ></div>
          <div
            className={`mt-[75px] h-0 w-full border-b-5 ${
              isDarkMode ? 'border-[#ababab]' : 'border-gray-500'
            } ${borderClass}`}
          ></div>
          {dots.map((dot: any, index: any) => (
            <React.Fragment key={index}>
              <div
                className="absolute -ml-7 -mt-0 flex h-7 w-7 items-center justify-center rounded-full font-bold text-white"
                style={{
                  left: `${(dot.dot - 1) * 60 + 21}px`,
                  top: `${(dot.fret - 1) * 77 + 30}px`,
                  backgroundColor: dotColors[index % dotColors.length],
                }}
              />
            </React.Fragment>
          ))}

          <button
            onClick={handlePrevVariation}
            className={`absolute -left-24 top-1/2 h-12 w-12 -translate-y-1/2 transform ${buttonClass} flex items-center justify-center rounded-full text-3xl shadow-md transition-all duration-200 hover:shadow-lg`}
          >
            ←
          </button>
          <button
            onClick={handleNextVariation}
            className={`absolute -right-32 top-1/2 h-12 w-12 -translate-y-1/2 transform ${buttonClass} flex items-center justify-center rounded-full text-3xl shadow-md transition-all duration-200 hover:shadow-lg`}
          >
            →
          </button>
          <div className="mt-24 flex items-center justify-center space-x-2">
            {variations.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  variations[index] === variation
                    ? 'bg-blue-500'
                    : isDarkMode
                      ? 'bg-gray-600'
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="grid grid-cols-2">
            <div>
              <Image
                src="/guitarfingernumber.svg"
                alt="Chord Diagram"
                width={0}
                height={0}
                sizes="100vw"
                className="mt-4 h-44 w-full pb-16"
              />
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center space-y-4 pb-14">
              <h1
                className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
              >
                Play this chord
              </h1>
              <div className="flex space-x-4">
                <button
                  onClick={handlePlayChord}
                  disabled={isPlaying}
                  className={`rounded p-2 ${
                    isPlaying
                      ? 'cursor-not-allowed bg-gray-400'
                      : isDarkMode
                        ? 'bg-[#65BAF9] text-white hover:bg-[#F3A749]'
                        : 'bg-[#65BAF9] text-white hover:bg-[#65BAF9]'
                  }`}
                >
                  {isPlaying ? 'Playing' : 'Play'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <audio ref={audioRef} onEnded={() => handleAudioEnded()} />
      </div>
    </div>
  )
}

export default UiChordDiagram
