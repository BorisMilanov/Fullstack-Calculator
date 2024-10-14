import React, { useState } from 'react';
import axios from 'axios';

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [operation, setOperation] = useState<string>('add');

  const handleCalculate = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/calculator/${operation}`, {
        params: { num1, num2 },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error during calculation:', error);
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(Number(e.target.value))}
        placeholder="Number 1"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(Number(e.target.value))}
        placeholder="Number 2"
      />
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <h2>Result: {result}</h2>}
    </div>
  );
};

export default Calculator;