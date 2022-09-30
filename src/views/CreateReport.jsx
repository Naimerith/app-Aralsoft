import React from 'react'
import ButtonContainer from '../components/ButtonContainer'
import OptionContainer from '../components/OptionContainer'

const CreateReport = () => {
  return (
    <div className='container-createReport'>
      <section>
        <ButtonContainer />
      </section>
      <section>
        <OptionContainer />
      </section>
    </div>
  )
}

export default CreateReport;