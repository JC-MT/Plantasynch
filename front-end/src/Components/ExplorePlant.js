
export default function ExplorePlant({name, category, latin}) {
  return (
    <div>
        <img className='w-[200px] h-[200px]' src={`https://dummyimage.com/200x200/000000/ffffff.jpg&text=House+Plant`} alt='Plant' />
        <p>Name: {name}</p>
        <p>Latin name: {latin}</p>
        <p>Category: {category}</p>
    </div>
    )
}