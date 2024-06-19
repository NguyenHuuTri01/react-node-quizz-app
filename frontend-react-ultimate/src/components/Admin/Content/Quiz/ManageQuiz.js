import { useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { FcPlus } from 'react-icons/fc';
import TableQuiz from './TableQuiz';
import { Accordion } from 'react-bootstrap';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);

    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required')
            return
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey={0}>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                        <div className='fw-bolder'>
                            Manage Quizzes
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className='border rounded-3 p-3'>
                                <legend className='float-none w-auto px-3'>
                                    Add new Quiz:
                                </legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="your quiz name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="description..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder="Quiz type..."
                                    />
                                </div>
                                <div className='more-actions'>
                                    <label className="form-label lable-upload" htmlFor='labelUpload'>
                                        <FcPlus /> Upload File Image
                                    </label>
                                    <input
                                        type='file'
                                        hidden id='labelUpload'
                                        onChange={(e) => handleChangeFile(e)}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button
                                        onClick={() => handleSubmitQuiz()}
                                        className='btn btn-warning'
                                    >
                                        Save
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="list-detail">
                <TableQuiz />
            </div>
        </div>
    )
}

export default ManageQuiz;
