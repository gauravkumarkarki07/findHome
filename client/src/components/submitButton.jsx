
export default function submitButton({title}) {
  return (
    <button
        type="submit"
        className="rounded-full px-4 py-2 bg-cyan-800 text-white w-full hover:bg-cyan-900"
    >
        {title}
    </button>
  )
}
