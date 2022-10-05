import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ReportGenerated = () => {
  const params = useParams();




  return (
    <div>Boton en la posicion {params.id}</div>
  )
}

export default ReportGenerated;