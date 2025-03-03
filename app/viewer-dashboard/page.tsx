import UpdatePositions from '../Components/UpdatePosition';

const ViewerDashboard = () => {
  return (
    <div className=" bg-gray-100 flex items-center justify-center py-8">
      <div className="m-6 bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <UpdatePositions/>
      </div>
    </div>
  );
};

export default ViewerDashboard;
