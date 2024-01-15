import React from 'react'
import { FaUser } from 'react-icons/fa'
import { Button, Modal } from 'react-bootstrap';
import { HiChevronLeft } from 'react-icons/hi'

const Header = ({selectedUser, onUserClick}) => {
    const [show, setShow] = React.useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

  return (
    <div className="position-sticky d-flex border-bottom px-sm-4 px-6 py-4 px-lg-6 justify-content-between align-items-center border-success bg-success rounded-3 " style={{ margin: "0 -.66rem"}} >
        <div className="d-flex gap-3 align-items-center">
            <div>
                <span className='d-inline d-md-none' style={{cursor: 'pointer'}} onClick={() => onUserClick(null)}>
                    <HiChevronLeft size={35} />
                </span>
                <span>
                    <FaUser size={35} />
                </span>
            </div>
            <div className="d-flex flex-column" style={{cursor: 'pointer'}} onClick={handleShow}>
                <div className='fs-4'>{`${selectedUser.first_name} ${selectedUser.last_name}`}</div>
                <div className="fs-6 font-light text-start text-muted ">
                    Online
                </div>
            </div>
        </div>
        <Button variant="primary" onClick={handleShow}>
        See Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h4>{`${selectedUser.first_name} ${selectedUser.last_name}`}</h4>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedUser.email}</p>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Header
