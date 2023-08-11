import PlantDetails from '../Components/PlantDetails';

export default function Show({ notification }) {
  return (
    <div className="text-center">
      <PlantDetails notification={notification} />
    </div>
  );
}
