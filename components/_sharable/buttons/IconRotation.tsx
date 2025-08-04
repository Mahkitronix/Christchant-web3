interface Props {
  button: any
  icon: any
  children: any
}

export default function IconRotation({ button, icon, children }: Props) {
  return (
    <div>
      <button onClick={button} className="">
        <span>{icon}</span>
        {children}
      </button>
    </div>
  )
}
