import React from 'react';

interface ResultProps {
  result: string | number;
}

const ResultComponent: React.FC<ResultProps> = ({ result }) => {
  return (
    <div>
      <h3>Резултат:</h3>
      <p>{result}</p>
    </div>
  );
};

export default ResultComponent;