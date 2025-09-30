/**
 * A primary button component.
 *
 * @param {object} props - The component's props.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @param {React.ReactNode} props.children - The content of the button.
 *
 * @returns {React.ReactElement} - The rendered button element.
 */
const PrimaryButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

