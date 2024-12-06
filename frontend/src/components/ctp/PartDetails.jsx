import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PartDetails = ({partDetails}) => {
    console.log("partDetails", partDetails)
    
  return (
    (partDetails) ? (
    <Container className = 'px-0'>
        <Col className = 'mt-4 mb-2'>
            <b>№ {partDetails.number} {partDetails.nameOfOrder}</b>
        </Col>
        <Col className = 'mb-2'>
            Кол-во пластин: 80
        </Col>
        <Col className = 'mb-2'>
            Дополнительно: 2
        </Col>
        <Col className = 'mb-2'>
            Брак: 2
        </Col>
        <Col className = 'mb-2'>
            Всего: 85
        </Col>    
        
        <Col className = 'mb-4'>
            Примечания: «Текст» отдает предпочтение добротным книгам, написанным в разное время, но по разным причинам так и не дошедшим до российских читателей.
        </Col>
    </Container>
    ) : ("")
  )
}

export default PartDetails