import React, { useState } from 'react';
import InputComponent from './Input';
import ResultComponent from './Result';

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [operation, setOperation] = useState<string>('+');

  const calculate = (): string | number => {
    const n1 = Number(num1);
    const n2 = Number(num2);

    if (isNaN(n1) || isNaN(n2)) {
      return 'Моля, въведете валидни числа!';
    }

    switch (operation) {
      case '+':
        return n1 + n2;
      case '-':
        return n1 - n2;
      case '*':
        return n1 * n2;
      case '/':
        if (n2 === 0) {
          return 'Грешка: деление на 0 е невъзможно!';
        }
        return n1 / n2;
      default:
        return 'Невалидна операция';
    }
  };

  return (
    <div>
      <h2>Калкулатор</h2>

      <InputComponent
        num1={num1}
        num2={num2}
        operation={operation}
        onNum1Change={setNum1}
        onNum2Change={setNum2}
        onOperationChange={setOperation}
      />

      <ResultComponent result={calculate()} />
    </div>
  );
};

export default Calculator;