import type { PackageTracking } from "../../types/types";
import TemperatureIcon from "../../assets/svg/temperature.svg";
import WaterDropIcon from "../../assets/svg/water-drop.svg";

type ReadingsListProps = {
  reading: PackageTracking;
};
const readingItem = (props: ReadingsListProps) => {
  const { reading } = props;
  console.log("reading in readingItem", reading);

  return (
    <div className="bg-white p-2 font-light">
      <div className="flex justify-between text-neutral-dark-2 opacity-80 hover:opacity-100">
        <p>{new Date(reading.createdAt).toLocaleDateString()}</p>
        <p>{new Date(reading.createdAt).toLocaleTimeString()}</p>
        {/* <h4>#{reading.id}</h4> */}
      </div>
      <div className="flex justify-around">
        <div className="flex items-center">
          <p className="flex place-items-center p-2 gap-1">
            <img
              src={TemperatureIcon}
              alt="temperature icon"
              className="w-4 h-4"
            />
            Temperature:{" "}
            <span className="font-bold">{reading.temperature}</span>
          </p>
        </div>
        <span className="flex place-items-center p-2 gap-1">
          <img src={WaterDropIcon} alt="water drop icon" className="w-4 h-4" />
          Humidity: <span className="font-bold">{reading.humidity}</span>
        </span>
      </div>
      {/*         <p>Coordinates: Long {reading.lng}, Lat {reading.lng}</p> */}
    </div>
  );
};

export default readingItem;
