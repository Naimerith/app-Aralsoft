import React from 'react';
import ButtonContainer from '../components/ButtonContainer';
import OptionContainer from '../components/OptionContainer';
import ButtonGenerateReport from '../components/ButtonGenerateReport';
import '../assets/styles/CreateReport.css';

const CreateReport = () => {
  return (
    <div className='container-createReport'>
      <section>
        <ButtonContainer />
      </section>
      <div className='container-generate-report'>
        <section>
          <OptionContainer />
        </section>
        <section>
          <ButtonGenerateReport />
        </section>
      </div>
    </div>
  )
}

export default CreateReport;