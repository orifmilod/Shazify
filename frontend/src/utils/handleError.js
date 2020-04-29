import { toast } from 'react-toastify'

export default function handleError(message, error) {
  toast.error(message)
  console.error(message, error)
}
