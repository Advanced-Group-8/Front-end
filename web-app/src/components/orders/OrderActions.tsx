type OrderActionsProps = {
  onUpdate: () => void;
  onDelete: () => void;
};

const OrderActions: React.FC<OrderActionsProps> = ({ onUpdate, onDelete }) => {
  return (
    <div className="flex space-x-4 mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={onUpdate}
      >
        Update
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default OrderActions;
