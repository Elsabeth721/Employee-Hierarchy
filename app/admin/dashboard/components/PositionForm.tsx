// PositionForm.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePositions from '../hooks/usePosition';

interface Position {
  name: string;
  description: string;
  parentId: string;
}

interface PositionFormProps {
  position: Position;
  onSubmit: (data: Position) => void;
}

const PositionForm: React.FC<PositionFormProps> = ({ position, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Position>();
  const [formPosition, setFormPosition] = useState(position || { name: '', description: '', parentId: '' });

  useEffect(() => {
    if (position) {
      setFormPosition(position);
    }
  }, [position]);

  const onFormSubmit = (data: Position) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <input
        {...register('name', { required: 'Position name is required' })}
        defaultValue={formPosition.name}
        className="input"
        placeholder="Position Name"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <textarea
        {...register('description')}
        defaultValue={formPosition.description}
        className="input"
        placeholder="Description"
      />

      <button type="submit" className="btn">Save</button>
    </form>
  );
};

export default PositionForm;
