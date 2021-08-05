import React from 'react'
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({showModal, hideModal, confirmModal, id, message}: any) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button className = "btn btn-secondary"  onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmModal(id) }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DeleteConfirmation;
