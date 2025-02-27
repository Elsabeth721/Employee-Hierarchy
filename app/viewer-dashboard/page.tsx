// pages/viewer-dashboard.js
import ViewerPosition from '..//Components/ViewPosition'; 

const ViewerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        {/* Call the ViewerPosition component */}
        <ViewerPosition />
      </div>
    </div>
  );
};

export default ViewerDashboard;
