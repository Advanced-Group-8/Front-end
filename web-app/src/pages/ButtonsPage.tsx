import IconButton from "../components/buttons/IconButton";

const ButtonsPage = () => {
  return (
    <>
      <div className="bg-accent-4 text-accent-1 flex text-center m-auto h-screen items-center justify-center text-4xl font-bold ">
        <div className="bg-white p-4 content-center w-100 gap-10">
          Button sizes:
          {/* SMALL */}
          <IconButton size="small" onClick={()=> {}} iconVariant="save">Small</IconButton>
          {/* MEDIUM */}
          <IconButton size="medium" onClick={()=> {}}  >Medium </IconButton>
          {/* LARGE */}
          <IconButton size="large" onClick={()=> {}}  >Large </IconButton>

          Variants:
          {/* PRIMARY */}
          <IconButton onClick={() => {}} iconVariant="save"> Primary </IconButton>
           {/* PRIMARY DISABLED */}
          <IconButton onClick={() => {}} iconVariant="save" disabled> Disabled </IconButton>

          {/* SECONDARY */}
          <IconButton onClick={() => {}} iconVariant="save" variant="secondary"> Secondary </IconButton>
          {/* SECONDARY DISABLED */}
          <IconButton onClick={() => {}} iconVariant="save" disabled variant="secondary"> Secondary Disabled </IconButton>
          
        </div>
      </div>
    </>
  );
};

export default ButtonsPage;
