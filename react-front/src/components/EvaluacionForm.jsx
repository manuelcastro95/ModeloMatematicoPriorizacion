import { useState } from 'react';
import CasoDeUsoInput from './CasoDeUsoInput';

const EvaluacionForm = ({ casosDeUso, onSubmit }) => {
  const [evaluaciones, setEvaluaciones] = useState(casosDeUso);

  const handleEvaluacionChange = (casoId, criterioId, valor) => {
    const updatedEvaluaciones = evaluaciones.map((caso) => {
      if (caso.caso_id === casoId) {
        const updatedEvaluaciones = caso.evaluaciones.map((evaluacion) => {
          if (evaluacion.criterio_id === criterioId) {
            return { ...evaluacion, valor: valor };
          }
          return evaluacion;
        });
        return { ...caso, evaluaciones: updatedEvaluaciones };
      }
      return caso;
    });
    setEvaluaciones(updatedEvaluaciones);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(evaluaciones);
  };

  return (
    <form onSubmit={handleSubmit}>
      {evaluaciones.map((casoDeUso) => (
        <CasoDeUsoInput
          key={casoDeUso.caso_id}
          casoDeUso={casoDeUso}
          onEvaluacionChange={handleEvaluacionChange}
        />
      ))}
      <button type="submit">Guardar Evaluaciones</button>
    </form>
  );
};

export default EvaluacionForm;
