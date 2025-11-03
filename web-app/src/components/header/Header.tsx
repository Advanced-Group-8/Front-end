
import Navbar from '../navbar/Navbar'
import truckIcon from "../../assets/svg/TruckIcon-Primary.svg";

const Header = () => (
  <header className='bg-primary-1 flex px-4 py-2'>
    <img src={truckIcon} alt="Truck icon" width={64} height={64} />
    <Navbar />
  </header>     
  )

export default Header