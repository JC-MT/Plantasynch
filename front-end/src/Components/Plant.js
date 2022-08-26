import { Link } from 'react-router-dom'

export default function Plant({id, image, name, category}) {
  return (
    <div>
      <Link to={`/my-plant/${id}`}>
        <img className='w-[200px] h-[200px]' src={`${image}`} alt='Plant' />
        <p>{name}</p>
        <p>{category}</p>
      </Link>
    </div>
    )
}