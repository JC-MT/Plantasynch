import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
  return (
    <ToastContainer
      className="z-50"
      limit={1}
      toastStyle={{ color: 'white', backgroundColor: 'black' }}
    />
  );
}
