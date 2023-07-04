import { User } from '@prisma/client';
import UserBox from './UserBox';

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({
  items
}) => {
  return (
    <div className='
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
        lg:w-80
    '>
      <div className='px-5'>
        <div className='flex-col'>
          <div className='text-2xl font-bold py-4'>
            Users
          </div>
        </div>
        { items.map(item=>(
          <UserBox
          key={item.id}
          data={item}
        />
        ))}
      </div>
    </div>
  );
};

export default UserList;