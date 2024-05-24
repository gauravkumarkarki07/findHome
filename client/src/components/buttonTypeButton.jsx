
export default function submitButton({title,action}) {
    return (
      <button
          type="button"
          className="rounded-full px-4 py-2 bg-cyan-800 text-white w-full hover:bg-cyan-950"
          onClick={action}
      >
          {title}
      </button>
    )
  }
  