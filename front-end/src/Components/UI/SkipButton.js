import axios from 'axios';
import * as dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useToast from '../../Hooks/useToast';
import useSkipConfirmation from '../../Hooks/useSkipConfirmation';

const API = process.env.REACT_APP_API_URL;

export default function SkipButton({ skip_count, name }) {
  const { id } = useParams();
  const [allowedToSkip, setAllowedToSkip] = useState(true);
  const [skippedClicked, setSkippedClicked] = useState(false);
  const [confirmation, setConfirmation, modelConfirmation] =
    useSkipConfirmation({ handleUpdate, name });
  const [sendToast] = useToast('skip');

  function hasSkippedToday(actions) {
    const now = dayjs().format('YYYY-MM-DD');
    const skippedToday = actions.filter(
      (action) => action.action === 'Skipped' && action.date === now
    );

    if (skippedToday.length) {
      setAllowedToSkip(false);
    }
  }

  useEffect(() => {
    axios
      .get(`${API}/plants/${id}`)
      .then((res) => {
        return res.data.payload;
      })
      .then((res) => {
        hasSkippedToday(res.actions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, skippedClicked]);

  function handleUpdate() {
    axios
      .put(`${API}/plants/skip/${id}`, { skip_count: skip_count })
      .then(() => {
        setSkippedClicked(true);
        setConfirmation(false);
        sendToast(true, name);
      })
      .catch((err) => {
        console.log(err);
        sendToast(false, name);
      });
  }

  return (
    <div
      className={`flex ${
        allowedToSkip && !skippedClicked ? `` : `cursor-not-allowed`
      }`}
    >
      <button
        className={`button-style mt-0 w-44 text-lg ${
          allowedToSkip && !skippedClicked ? `` : `pointer-events-none`
        }`}
        onClick={() => {
          setConfirmation(true);
        }}
      >{`${
        allowedToSkip && !skippedClicked ? 'Skip Today' : 'Skipped'
      }`}</button>
      {confirmation ? modelConfirmation : ''}
    </div>
  );
}
