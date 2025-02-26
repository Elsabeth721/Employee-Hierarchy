// usePosition.tsx
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { loadPositions, createPosition, updatePosition } from './positionAction';
// import { removePosition } from '../../services/positionService';

const usePositions = () => {
  const dispatch: AppDispatch = useDispatch();
  const positions = useSelector((state: any) => state.positions?.list || []); // Safely access positions.list with fallback

  const loadPositionsList = () => {
    dispatch(loadPositions());
  };

  const addNewPosition = (position: Record<string, any>) => {
    dispatch(createPosition(position));
  };

  const editExistingPosition = (position: { id: string; [key: string]: any }) => {
    dispatch(updatePosition(position));
  };

//   const deleteExistingPosition = (id: string) => {
//     removePosition(id).then(() => {
//       dispatch({ type: 'REMOVE_POSITION_SUCCESS', payload: id });
//     }).catch((error: any) => {
//       dispatch({ type: 'REMOVE_POSITION_FAILURE', error });
//     });
//   };

  return {
    positions,
    loadPositions: loadPositionsList,
    createPosition: addNewPosition,
    updatePosition: editExistingPosition,
    // removePosition: deleteExistingPosition,
  };
};

export default usePositions;
