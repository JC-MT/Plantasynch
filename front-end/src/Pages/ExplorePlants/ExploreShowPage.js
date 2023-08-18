import Info from '../../Components/List/Explore/Info';
import Toast from '../../Components/UI/Toast';

export default function ExploreShowPage({ loggedInUser }) {
  return (
    <div>
      <Info loggedInUser={loggedInUser} />
      <Toast />
    </div>
  );
}
