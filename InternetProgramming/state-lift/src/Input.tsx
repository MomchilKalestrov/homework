import React from 'react';

interface InputProps {
  num1: string;
  num2: string;
  operation: string;
  onNum1Change: (value: string) => void;
  onNum2Change: (value: string) => void;
  onOperationChange: (value: string) => void;
}

const InputComponent: React.FC<InputProps> = ({
  num1,
  num2,
  operation,
  onNum1Change,
  onNum2Change,
  onOperationChange
}) => {
  return (
    <div>
      <input
        type='number'
        value={num1}
        onChange={(e) => onNum1Change(e.target.value)}
        placeholder='Първо число'
      />

      <select
        value={operation}
        onChange={(e) => onOperationChange(e.target.value)}
      >
        <option value='+'>+</option>
        <option value='-'>-</option>
        <option value='*'>*</option>
        <option value='/'>/</option>
      </select>

      <input
        type='number'
        value={num2}
        onChange={(e) => onNum2Change(e.target.value)}
        placeholder='Второ число'
      />
    </div>
  );
};

export default InputComponent;