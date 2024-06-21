import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsPatchMinusFill } from 'react-icons/bs';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiFillPlusSquare } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = (props) => {

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer 1',
                    isCorrect: false
                },
            ]
        },
    ]);

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };
            setQuestions([...questions, newQuestion])
        }

        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);

        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === 'REMOVE') {
            questionsClone[index].answers =
                questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone);
        }
    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <hr />
            <div className="add-new-question">
                <div className='col-6'>
                    <label className='form-label'>Select Quiz: </label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        className='z-2'
                    />
                </div>
                <div>
                    <label className='form-label'> Add questions:</label>
                </div>
                {
                    questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div
                                key={question.id}
                                className='q-main mb-3 px-2 border border-warning rounded'
                            >
                                <div className='mt-3 row question-content'>
                                    <div className='form-floating mb-3 col-6 description'>
                                        <input
                                            type="text"
                                            className='form-control'
                                            placeholder='Description'
                                            value={question.description}
                                        />
                                        <label className='z-1'>
                                            Question {index + 1} description
                                        </label>
                                    </div>
                                    <div className='col-3 group-upload'>
                                        <label>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input type="file" hidden />
                                        <span>0 file is uploaded</span>
                                    </div>
                                    <div className='col-3 btn-add'>
                                        {
                                            index + 1 === questions.length &&
                                            <span
                                                onClick={() => handleAddRemoveQuestion('ADD', '')}
                                            >
                                                <BsFillPatchPlusFill className='icon-add' />
                                            </span>
                                        }
                                        {
                                            questions.length > 1 &&
                                            <span
                                                onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}
                                            >
                                                <BsPatchMinusFill className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, aIndex) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    className='form-check-input i-check'
                                                    type='checkbox'
                                                    checked={answer.isCorrect}
                                                />
                                                <div className='form-floating mb-3 col-8 description'>
                                                    <input
                                                        type="text"
                                                        className='form-control mt-3'
                                                        placeholder='Answer'
                                                        value={answer.description}
                                                    />
                                                    <label>Answer {aIndex + 1}</label>
                                                </div>
                                                <div className='col-3 btn-add'>
                                                    <span
                                                        onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}
                                                    >
                                                        <AiFillPlusSquare className='icon-add' />
                                                    </span>
                                                    {
                                                        question.answers.length > 1 &&
                                                        <span
                                                            onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}
                                                        >
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Questions
