import { Link } from 'react-router-dom';
const AWS = process.env.REACT_APP_AWS_URL;

export default function Plant({ plantInfo, id, name, knownAs, category }) {
  return (
    <Link to={`/explore/${id}`} state={plantInfo}>
      <div className="flex flex-row transition-all duration-200 justify-between rounded-lg hover:bg-slate-100 hover:shadow-2xl">
        <div className="flex">
          <img
            className="rounded-full w-[150px] h-[150px]"
            src={`${AWS}15-20-2-28-3-14-30m.jpeg`}
            alt="Plant"
          />
          <p className="flex flex-col p-2">
            {name}
            <span className="text-[14px]">
              {knownAs.length > 1
                ? `Other Names: ${knownAs.slice(1).join(', ')}`
                : ''}
            </span>
            <span className="text-[14px]">Type: {category}</span>
          </p>
        </div>
        <svg
          className="flex self-center w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
}
