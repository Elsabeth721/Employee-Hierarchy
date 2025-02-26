// PositionTree.tsx
import React from 'react';

interface Position {
  id: number;
  name: string;
  children?: Position[];
}

const PositionTree: React.FC<{ positions: Position[] }> = ({ positions }) => {
  const renderTree = (positions: any[]) => {
    return positions.map((pos) => (
      <div key={pos.id} className="position-node">
        <div className="position-name">
          {pos.name}
        </div>
        {pos.children && <div className="ml-4">{renderTree(pos.children)}</div>}
      </div>
    ));
  };

  return <div>{renderTree(positions)}</div>;
};

export default PositionTree;
