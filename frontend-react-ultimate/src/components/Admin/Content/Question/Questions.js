import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsPatchMinusFill } from 'react-icons/bs';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiFillPlusSquare } from 'react-icons/ai';

const Questions = (props) => {

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({})

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className='col-6'>
                    <label className='form-label'>Select Quiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}

                    />
                </div>
                <div>
                    <div className='mt-3 row question-content'>
                        <label className='form-label'> Add questions:</label>
                        <div className='form-floating mb-3 col-7 description'>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Description'
                            />
                            <label>Description</label>
                        </div>
                        <div className='col-3 group-upload'>
                            <label className='label-up'>Upload Image</label>
                            <input type="file" hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='col-2 btn-add'>
                            <span><BsFillPatchPlusFill className='icon-add' /></span>
                            <span><BsPatchMinusFill className='icon-remove' /></span>
                        </div>
                    </div>
                    <div className='answers-content'>
                        <input
                            className='form-check-input i-check'
                            type='checkbox'
                        />
                        <div className='form-floating mb-3 col-8 description'>
                            <input
                                type="text"
                                className='form-control mt-3'
                                placeholder='Answer'
                            />
                            <label>Answer 1</label>
                        </div>
                        <div className='col-3 btn-add'>
                            <span><AiFillPlusSquare className='icon-add' /></span>
                            <span><AiOutlineMinusCircle className='icon-remove' /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions
