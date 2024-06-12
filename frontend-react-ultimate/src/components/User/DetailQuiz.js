import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from '../../services/apiService';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from "./Question";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [indexQ, setIndexQ] = useState(0);

    useEffect(() => {
        fetchQuestions(quizId);
    }, [quizId])

    const fetchQuestions = async (quizId) => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let questionDes, image = null;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = []
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDes = item.description;
                            image = item.image
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, questionDes, image }
                })
                .value();
            setDataQuiz(data);
        }
    }

    const handlePrev = () => {
        if (indexQ > 0) {
            setIndexQ(indexQ - 1)
        }
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > indexQ + 1) {
            setIndexQ(indexQ + 1)
        }
    }


    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {

            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item;
            })
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleFinishQuiz = async () => {
        let payLoad = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId
                let userAnswerId = [];

                item.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id);
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payLoad.answers = answers;
            let res = await postSubmitQuiz(payLoad);
            console.log('check res: ', res)
            if (res && res.EC === 0) {

            } else {
                alert("Something wrongs....")
            }
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img src="" alt="" />
                </div>
                <div className="q-content">
                    <Question
                        index={indexQ}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[indexQ] : []}
                        handleCheckBox={handleCheckBox}
                    />
                </div>
                <div className="footer">
                    <button
                        className="btn btn-primary"
                        onClick={() => handlePrev()}
                    >Prev</button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => handleNext()}
                    >Next</button>

                    <button
                        className="btn btn-warning"
                        onClick={() => handleFinishQuiz()}
                    >Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz;
