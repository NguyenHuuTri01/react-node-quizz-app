import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from '../../services/apiService';
import _ from 'lodash';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

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
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, questionDes, image }
                })
                .value();
            console.log(data)
        }
    }

    return (
        <div>
            hello word DetailQuiz
        </div>
    )
}

export default DetailQuiz;
