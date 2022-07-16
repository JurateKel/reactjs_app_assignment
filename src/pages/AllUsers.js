import { useSelector } from 'react-redux';
import { allUsers } from '../features/user';
import RenderUser from '../components/RenderUser';


function AllUsers() {
  const allUsersStore = useSelector(state => state.user.value.allUsers)
  
  return (
    <div className='user-cards-wrapper'>
      {allUsersStore.map((user, i) => <RenderUser user={user} key={i} />)}
    </div>
  )
}

export default AllUsers