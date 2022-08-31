import { Link } from 'react-router-dom'

export default function ExplorePlant({ id, name, category, latin}) {
  return (
    <div>
      <Link to={`/explore/${id}`}>
        <img className='w-[200px] h-[200px]' src={`https://dummyimage.com/200x200/000000/ffffff.jpg&text=House+Plant`} alt='Plant' />
        <p>Name: {name}</p>
        <p>Latin name: {latin}</p>
        <p>Category: {category}</p>
      </Link>
    </div>
    )
}