import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import EditCtpForm from '../ctp/EditCtpForm'; // Форма редактирования
import UpdateCtpInfo from './UpdateCtpInfo.js'
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios"

const PartDetails = ({ partDetails }) => {    
    const api = useAxios();
    const { user } = useContext(AuthContext);
    // console.log("partDetails!", partDetails)
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };



    return isEditing ? (
        <Container className="px-0">
            <EditCtpForm
                initialValues={partDetails} // Передаем данные заказа как начальные значения
                onSubmit={async (updatedValues) => {
                    await UpdateCtpInfo(api, updatedValues, user);
                    // const updateCtpInfo =  UpdateCtpInfo(updatedValues, user);
                    // setValidated(true);
                    // setErrors(updateOrder);
                    console.log("Updated order:", updatedValues);
                    setIsEditing(false); // Вернуться к просмотру после сохранения
                }}
                onCancel={handleCancelEdit} // Отмена редактирования
            />
        </Container>
    ) : (
        <Container className="px-0">
                <Col className="mt-4 mb-2">
                    <b>№ {partDetails?.orderNumber || 'Не указано'} {partDetails?.nameOfOrder  || ''}{partDetails?.partName && ','} {partDetails?.partName  || ''}</b>
                </Col>
                <Col className="mb-2">Кол-во пластин: {partDetails?.ctp?.plates || 0}</Col>
                {/* <Col className="mb-2">Перевывод: {partDetails?.ctp?.plates_bad || 0}</Col> */}
                <Col className="mb-2">Брак: {partDetails?.ctp?.plates_bad || 0}</Col>
                <Col className="mb-2">
                    Всего: {parseInt(partDetails?.ctp?.plates || 0) + parseInt(partDetails?.ctp?.plates_bad || 0)}
                </Col>
                <Col className="mb-4">Примечания: {partDetails?.ctp?.notes || 'Нет данных'}</Col>
                <Col className="mb-4">Дата вывода: {partDetails?.ctp?.plates_done_date || 'Не указана'}</Col>

                <Button
                    variant="secondary"
                    className="p-2 shadow-none"
                    onClick={handleEditClick}
                >
                    Изменить
                </Button>
            {/* </Col> */}
        </Container>
    );
};

export default PartDetails;
