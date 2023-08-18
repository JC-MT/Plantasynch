import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
  return (
    <div className="z-50">
      <ToastContainer
        limit={1}
        toastStyle={{ color: 'white', backgroundColor: 'black' }}
      />
    </div>
  );
}
