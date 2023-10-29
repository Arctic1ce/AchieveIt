import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function NewItem(props) {

    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null
            })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateForm = () => {
        const { task, date, priority, category } = form
        const newErrors = {}

        if (!task || task === '') newErrors.task = 'Please enter a task.'
        if (!date || date === '') newErrors.date = 'Please select a valid date.'
        if (!priority || priority === 'Select priority') newErrors.priority = 'Please select a priority.'
        if (!category || category === 'Select list name') newErrors.category = 'Please select a list name.'

        return newErrors
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            handleClose();
            const newTask = {
                task: form.task,
                description: form.description,
                due_date: form.date,
                priority: form.priority,
                task_category: form.category,
                completed: false,
            }

            props.insertTask(form.category, newTask);
        }
    };

    return (
        <div>
            <Button variant="dark" onClick={handleShow} className="me-2">
                Add New Item
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item to List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTask">
                            <Form.Label>Task</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Physics homework"
                                value={form.task}
                                onChange={(e) => setField('task', e.target.value)}
                                autoFocus
                                isInvalid={!!errors.task}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.task}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Problems from chapters 10.2 and 10.3"
                                value={form.description}
                                onChange={(e) => setField('description', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="2023-10-28"
                                value={form.date}
                                onChange={(e) => setField('date', e.target.value)}
                                isInvalid={!!errors.date}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPriority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                value={form.priority}
                                onChange={(e) => setField('priority', e.target.value)}
                                placeholder='Select priority'
                                isInvalid={!!errors.priority}
                                required
                            >
                                <option>Select priority</option>
                                <option key={"Low"} value="Low">Low</option>
                                <option key={"Medium"} value="Medium">Medium</option>
                                <option key={"High"} value="High">High</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.priority}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPriority">
                            <Form.Label>List Name</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                value={form.category}
                                onChange={(e) => setField('category', e.target.value)}
                                placeholder='Select list name'
                                isInvalid={!!errors.category}
                                required
                            >
                                <option>Select list name</option>
                                {props.list.map((task) => (
                                    <option key={`${task.name}`}value={task.name}>{task.name}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="dark" type="submit">
                                Add Item
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    );
}

export default NewItem;