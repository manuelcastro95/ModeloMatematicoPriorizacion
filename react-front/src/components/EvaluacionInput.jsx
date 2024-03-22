import { useState } from 'react';
const EvaluacionInput = ({ criterio, onChange }) => {
  const [valor, setValor] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValor(newValue);
    onChange(criterio.id, newValue);
  };

  return (
    <div>
      <label>{criterio.nombre}</label>
      <input type="number" value={valor} onChange={handleChange} />
    </div>
  );
};

export default EvaluacionInput;
