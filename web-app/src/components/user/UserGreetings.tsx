
import type { Profile } from '../../types/types'

export const UserGreetings = (props: { user: Profile }) => {

  return (
     <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg min-w-[200px] max-w-[500px]">
      <h2 className='text-2xl'>Hi, {props.user.name}!</h2>
      <div className="flex flex-col gap-1">
        <p>Company: {props.user.companyName}</p>
        <p>Role: {props.user.role}</p>
      </div>
    </div>
  )
}
