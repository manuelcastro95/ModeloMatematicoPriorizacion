
import EvaluacionInput from './EvaluacionInput';

const CasoDeUsoInput = ({ casoDeUso, onEvaluacionChange }) => {
  const handleEvaluacionChange = (criterioId, valor) => {
    onEvaluacionChange(casoDeUso.caso_id, criterioId, valor);
  };

  return (
    <div>
      <h3>Caso de Uso {casoDeUso.caso_id}</h3>
      {casoDeUso.evaluaciones.map((evaluacion) => (
        <EvaluacionInput
          key={evaluacion.criterio_id}
          criterio={evaluacion}
          onChange={handleEvaluacionChange}
        />
      ))}
    </div>
  );
};

export default CasoDeUsoInput;
