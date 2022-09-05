import { Link } from 'react-router-dom'

export default function Plant({id, image, name, category, notification}) {
  const getNotify = () => notification.find((plant) => plant.id === id)

  return (
    <div className='flex flex-row justify-between hover:bg-slate-200 tablet:px-8 laptop:plant-laptop'>
      <Link className='flex flex-row' to={`/my-plants/${id}`}>
        <img className='rounded-full w-[150px] h-[150px]' src={`${image}`} alt='Plant' />
        <p className={` ${getNotify() ? 'text-red-400' : 'text-green-400'} flex flex-col p-2`}>Name: {name}
        <span>Type: {category}</span>
        </p>
      </Link>
      <Link  className='flex flex-row' to={`/my-plants/${id}`}>
      <svg className='flex self-center w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
      </svg>
      </Link>
    </div>
    )
}