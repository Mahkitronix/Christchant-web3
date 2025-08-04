import { CenterMenuItems } from '@/components/layouts/center/CenterMenuItems'
import CenterLayout from '@/components/layouts/center/CenterLayout'
import { WithUserAuthPage } from '@/middleware/WithUserAuthPage'
import { guitarChordBreadCrumbs } from '@/components/songs/BreadCrumbs'

import UiChordDiagram from '@/components/_sharable/form/UiChordDiagram'
import { useState } from 'react'

const pageTitle = 'Guitar Chords'

const breadcrumbs = [
  ...guitarChordBreadCrumbs,
  {
    link: 'songs/view',
    label: pageTitle,
  },
]

const chordTypes = [
  {
    type: 'Major',
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    chords: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
  },
  {
    type: 'Minor',
    color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
    chords: ['Am', 'Bm', 'Cm', 'Dm', 'Em', 'Fm', 'Gm'],
  },
  {
    type: '7th',
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    chords: ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7'],
  },
  {
    type: 'Major 7th',
    color: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
    chords: ['Amaj7', 'Bmaj7', 'Cmaj7', 'Dmaj7', 'Emaj7', 'Fmaj7', 'Gmaj7'],
  },
  {
    type: 'Minor 7th',
    color: 'bg-red-100 text-red-700 hover:bg-red-200',
    chords: ['Am7', 'Bm7', 'Cm7', 'Dm7', 'Em7', 'Fm7', 'Gm7'],
  },
  {
    type: 'Suspended',
    color: 'bg-orange-100 text-orange-700 hover:bg-orange-200', // TODO: Separate this color
    chords: ['Asus4', 'Bsus4', 'Csus4', 'Dsus4', 'Esus4', 'Fsus4', 'Gsus4'],
  },
]

const GuitarChordsPage = () => {
  const [selectedChord, setSelectedChord] = useState<string | null>(null)
  const dashboardTitle = 'Guitar Chords Library'

  return (
    <CenterLayout
      pageTitle={dashboardTitle}
      pageDescription={''}
      menuItems={CenterMenuItems}
      breadcrumbs={breadcrumbs}
    >
      <div className="py-4">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {chordTypes.map((type) => (
              <div
                key={type.type}
                className="rounded-lg bg-white p-6 shadow-md"
              >
                <h2 className="mb-4 text-xl font-semibold">
                  {type.type} Chords
                </h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
                  {type.chords.map((chord) => (
                    <button
                      key={chord}
                      onClick={() => setSelectedChord(chord)}
                      className={` ${type.color} rounded-lg px-4 py-3 text-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {chord}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedChord && (
            <UiChordDiagram
              chord={selectedChord}
              onClose={() => setSelectedChord(null)}
            />
          )}
        </div>
      </div>
    </CenterLayout>
  )
}

export default WithUserAuthPage(GuitarChordsPage)
