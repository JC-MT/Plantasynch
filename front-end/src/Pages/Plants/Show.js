import Details from '../../Components/List/Plant/Details';
import Toast from '../../Components/UI/Toast';

export default function Show({ notification }) {
  return (
    <div className="text-center">
      <Details notification={notification} />
      <Toast />
    </div>
  );
}
