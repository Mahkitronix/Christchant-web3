const PirceContent = [
  {
    label: 'Bsic Plan',
    Buys: '10',
  },
  {
    label: 'Standard',
    Buys: '20',
  },
  {
    label: 'Premium',
    Buys: '30',
  },
]

export default function Pricing() {
  return (
    <div>
      <h1>Pricing</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {PirceContent.map((plan, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '20px',
              borderRadius: '8px',
              width: '200px',
            }}
          >
            <h2>{plan.label}</h2>
            <p>Price: ${plan.Buys}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
