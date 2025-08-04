import React from 'react'

interface Props {
  password: string
}

interface Requirement {
  regex: RegExp
  text: string
}

const requirements: Requirement[] = [
  { regex: /.{8,}/, text: '8+ characters' },
  { regex: /[A-Z]/, text: 'Uppercase letter' },
  { regex: /[a-z]/, text: 'Lowercase letter' },
  { regex: /[0-9]/, text: 'Number' },
  { regex: /[\W_]/, text: 'Special character' },
]

export default function UiPasswordStrength({ password }: Props) {
  const getStrengthPercentage = () => {
    if (!password) return 0
    const matchedRequirements = requirements.filter((req) =>
      req.regex.test(password)
    )
    return (matchedRequirements.length / requirements.length) * 100
  }

  const getStrengthColor = () => {
    const strength = getStrengthPercentage()
    if (strength <= 20) return 'bg-red-500'
    if (strength <= 40) return 'bg-orange-500'
    if (strength <= 60) return 'bg-yellow-500'
    if (strength <= 80) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const strengthPercentage = getStrengthPercentage()

  return (
    <div className="mt-2 space-y-2">
      <div className="h-1 w-full rounded-full bg-gray-200">
        <div
          className={`h-1 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {requirements.map((req, index) => (
          <span
            key={index}
            className={`rounded px-2 py-1 ${
              req.regex.test(password)
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {req.text}
          </span>
        ))}
      </div>
    </div>
  )
}
