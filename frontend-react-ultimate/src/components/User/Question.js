import _ from 'lodash';

const Question = (props) => {
    const { data, index } = props;

    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    const handleCheckBox = (e, aId, qId) => {
        props.handleCheckBox(aId, qId)
    }

    return (
        <>
            {
                data.image ?
                    <div className='q-image'>
                        <img src={`data:image/jpeg;base64,${data.image}`} alt='' />
                    </div>
                    :
                    <div className='q-image'>
                    </div>
            }
            <div className="question">
                Question {index + 1}: {data.questionDes}?
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((a, index) => {
                        return (
                            <div
                                key={`answer-${index}`}
                                className="a-child">
                                <div className='form-check'>
                                    <input
                                        className='form-check-input i-check'
                                        type='checkbox'
                                        checked={a.isSelected}
                                        onChange={(e) => handleCheckBox(e, a.id, data.questionId)}
                                    />
                                    <label className='form-check-label'>
                                        {a.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default Question;
