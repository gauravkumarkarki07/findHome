import { FcGoogle } from "react-icons/fc";
export default function OAuth() {
  return (
    <button
        type="submit"
        className="rounded-full px-4 py-2 bg-orange-500 text-white w-full hover:bg-orange-600 flex justify-center gap-4 items-center"
    >
        <FcGoogle/>
        <span>
            Continue with Google
        </span>
    </button>
  )
}
