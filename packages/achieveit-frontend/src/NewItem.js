import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import Form from 'react-bootstrap/Form';
import { Select, SelectItem, Textarea } from '@nextui-org/react';

function NewItem(props) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const priority = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  const validateForm = () => {
    const { task, date, priority, category } = form;
    const newErrors = {};

    const today = new Date().toISOString().slice(0, 10);

    if (!task || task === '') newErrors.task = 'Please enter a task.';
    if (!date || date === '') newErrors.date = 'Please select a valid date.';
    else if (date < today)
      newErrors.date = 'You cannot select a date in the past.';
    if (!priority || priority === 'Select priority')
      newErrors.priority = 'Please select a priority.';
    if (!category || category === 'Select list name')
      newErrors.category = 'Please select a list name.';

    return newErrors;
  };

  const handleClose = (event) => {
    setForm({});
    setErrors({});
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      handleClose();
      const newTask = {
        task: form.task,
        description: form.description,
        due_date: form.date,
        priority: form.priority,
        task_category: form.category,
        completed: false,
      };

      props.insertTask(form.category, newTask);
    }
  };

  return (
    <div>
      <Button className="mt-3 mb-3" color="primary" onPress={onOpen}>
        Add New Item
      </Button>
      <Modal
        backdrop="opaque"
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        radius="2x1"
        classNames={{
          body: 'py-6',
          base: `border-[#292f46] ${
            props.isDark ? 'achieveit-dark' : 'achieveit-light'
          } text-foreground bg-background bg-primary-50 text-secondary`,
          header: 'border-b-[1px] border-[#292f46] text-secondary',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-black/10 active:bg-black/10',
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New Item To List</ModalHeader>
              <ModalBody>
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group
                    className="w-full flex flex-col gap-4 mb-3"
                    controlId="formTask">
                    <Input
                      autoFocus
                      type="text"
                      label={<b>{'Task'}</b>}
                      placeholder="Physics homework"
                      value={form.task}
                      onChange={(e) => setField('task', e.target.value)}
                      labelPlacement="outside"
                      isInvalid={!!errors.task}
                      errorMessage={errors.task}
                      isRequired
                    />
                  </Form.Group>
                  <Form.Group
                    className="w-full flex flex-col gap-4 mb-3"
                    controlId="formDescription">
                    <Textarea
                      type="textarea"
                      label={<b>{'Description'}</b>}
                      placeholder="Problems from chapters 10.2 and 10.3"
                      value={form.description}
                      onChange={(e) => setField('description', e.target.value)}
                      labelPlacement="outside"
                    />
                  </Form.Group>

                  <Form.Group
                    className="w-full flex flex-row gap-4 mb-3"
                    controlId="formDueDate">
                    <Input
                      type="date"
                      label={<b>{'Due Date'}</b>}
                      placeholder="2023-10-28"
                      value={form.date}
                      onChange={(e) => setField('date', e.target.value)}
                      labelPlacement="outside"
                      isInvalid={!!errors.date}
                      errorMessage={errors.date}
                      isRequired
                    />
                  </Form.Group>
                  <Form.Group
                    className="w-full flex flex-col gap-4 mb-3"
                    controlId="formPriority">
                    <Select
                      label={<b>{'Priority'}</b>}
                      labelPlacement="outside"
                      placeholder="Select Priority"
                      value={form.priority}
                      onChange={(e) => setField('priority', e.target.value)}
                      isInvalid={!!errors.priority}
                      errorMessage={errors.priority}
                      isRequired>
                      {priority.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </Form.Group>
                  <Form.Group
                    className="w-full flex flex-col gap-4 mb-3"
                    controlId="formlistname">
                    <Select
                      label={<b>{'Listname'}</b>}
                      labelPlacement="outside"
                      placeholder="Select Listname"
                      value={form.category}
                      onChange={(e) => setField('category', e.target.value)}
                      isInvalid={!!errors.category}
                      errorMessage={errors.category}
                      isRequired>
                      {props.list.map((task) => (
                        <SelectItem key={task.name} value={task.name}>
                          {task.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </Form.Group>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleClose}>Close</Button>
                <Button color="primary" type="submit" onClick={handleSubmit}>
                  Add Item
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default NewItem;
