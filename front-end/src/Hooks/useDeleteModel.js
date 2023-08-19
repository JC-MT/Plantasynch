import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from './useToast';

const API = process.env.REACT_APP_API_URL;

export default function useDeleteModel({ id, plant }) {
  const [deleteModel, setDeleteModel] = useState(false);
  const navigate = useNavigate();
  const [sendToast] = useToast('delete');

  function handleDelete() {
    axios
      .delete(`${API}/plants/${id}`)
      .then(() => {
        sendToast('success', plant.name);
        setTimeout(() => navigate('/my-plants'), 4000);
      })
      .catch((err) => {
        console.warn(err);
        sendToast('error', plant.name);
      });
  }

  const modelStructure = (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed left-0 bottom-0 w-screen h-screen z-50 pt-0">
      <div className="bg-white px-8 py-10 rounded-md text-center w-[90%] max-w-[600px] tracking-wide font-normal">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Are you sure you want to delete this plant?
        </h1>
        <button
          onClick={() => setDeleteModel(false)}
          className="bg-red-500 px-2 py-2 rounded-md text-md tracking-wider text-white hover:bg-red-600"
        >
          Don't delete
        </button>
        <button
          onClick={() => handleDelete()}
          className="bg-green-500 hover:bg-green-600 px-2 py-2 ml-2 tracking-wider rounded-md text-md text-white"
        >
          Yes, please
        </button>
      </div>
    </div>
  );

  return [deleteModel, setDeleteModel, modelStructure];
}
