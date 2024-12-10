import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PartDetails = ({partDetails}) => {
    console.log("partDetails", partDetails)
        
    const all_plates = (partDetails)=> {
        return partDetails.ctp.plates + partDetails.ctp.plates_bad
         
    }
    // }
    // const all_plates = partDetails.orderNumber 
    
    // console.log("all_plates", all_plates)
  return (
    (partDetails) ? (
    <Container className = 'px-0'>
        <Col className = 'mt-4 mb-2'>
            <b>№ {partDetails.orderNumber} {partDetails.nameOfOrder}</b>
        </Col>
        <Col className = 'mb-2'>
            Кол-во пластин: {partDetails.ctp.plates}
        </Col>
        <Col className = 'mb-2'>
            Перевывод: {partDetails.ctp.plates_bad}
        </Col>
        <Col className = 'mb-2'>
            Брак: {partDetails.ctp.plates_bad}
        </Col>
        <Col className = 'mb-2'>
            Всего: {parseInt(parseInt(partDetails.ctp.plates) + parseInt(partDetails.ctp.plates_bad))}
            {/* {({partDetails.ctp.plates},  {partDetails.ctp.plates_bad})=>{}} */}
        </Col>    
        <Col className = 'mb-4'>
            Примечания: {partDetails.ctp.notes}
        </Col>
        <Col className = 'mb-4'>
            Дата: {partDetails.ctp.plates_done_date}
        </Col>
    </Container>
    ) : ("")
  )
}

export default PartDetails