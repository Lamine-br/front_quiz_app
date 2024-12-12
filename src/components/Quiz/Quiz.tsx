import { useState } from "react";
import "./Quiz.css";

// Defining the question's structure
interface QuizQuestion {
	question: string;
	choices: string[];
	type: string;
	correctAnswer: string;
}

// Defining the quiz's structure
interface QuizData {
	topic: string;
	level: string;
	totalQuestions: number;
	perQuestionScore: number;
	questions: QuizQuestion[];
}

// Defining the result's structure
interface Result {
	score: number;
	correctAnswers: number;
	wrongAnswers: number;
}

const quiz: QuizData = {
	topic: "Javascript",
	level: "Beginner",
	totalQuestions: 4,
	perQuestionScore: 5,
	questions: [
		{
			question:
				"Which function is used to serialize an object into a JSON string in Javascript?",
			choices: ["stringify()", "parse()", "convert()", "None of the above"],
			type: "MCQs",
			correctAnswer: "stringify()",
		},
		{
			question:
				"Which of the following keywords is used to define a variable in Javascript?",
			choices: ["var", "let", "var and let", "None of the above"],
			type: "MCQs",
			correctAnswer: "var and let",
		},
		{
			question:
				"Which of the following methods can be used to display data in some form using Javascript?",
			choices: [
				"document.write()",
				"console.log()",
				"window.alert",
				"All of the above",
			],
			type: "MCQs",
			correctAnswer: "All of the above",
		},
		{
			question: "How can a datatype be declared to be a constant type?",
			choices: ["const", "var", "let", "constant"],
			type: "MCQs",
			correctAnswer: "const",
		},
	],
};

const Quiz = () => {
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
		null
	);
	const [result, setResult] = useState<Result>({
		score: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
	});

	const { questions } = quiz;
	const { question, choices, correctAnswer } = questions[activeQuestion];

	const onClickNext = () => {
		setSelectedAnswerIndex(null);
		setResult((prev) =>
			selectedAnswer
				? {
						...prev,
						score: prev.score + quiz.perQuestionScore,
						correctAnswers: prev.correctAnswers + 1,
				  }
				: { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
		);
		if (activeQuestion !== questions.length - 1) {
			setActiveQuestion((prev) => prev + 1);
		} else {
			setActiveQuestion(0);
			setShowResult(true);
		}
	};

	const onAnswerSelected = (answer: string, index: number) => {
		setSelectedAnswerIndex(index);
		setSelectedAnswer(answer === correctAnswer);
	};

	const addLeadingZero = (number: number) =>
		number > 9 ? number : `0${number}`;

	return (
		<div className='quiz-container'>
			{!showResult ? (
				<div>
					<div>
						<span className='active-question-no'>
							{addLeadingZero(activeQuestion + 1)}
						</span>
						<span className='total-question'>
							/{addLeadingZero(questions.length)}
						</span>
					</div>
					<h2>{question}</h2>
					<ul>
						{choices.map((answer, index) => (
							<li
								onClick={() => onAnswerSelected(answer, index)}
								key={answer}
								className={
									selectedAnswerIndex === index ? "selected-answer" : ""
								}
							>
								{answer}
							</li>
						))}
					</ul>
					<div className='flex-right'>
						<button
							onClick={onClickNext}
							disabled={selectedAnswerIndex === null}
						>
							{activeQuestion === questions.length - 1 ? "Finish" : "Next"}
						</button>
					</div>
				</div>
			) : (
				<div className='result'>
					<h3>Result</h3>
					<p>
						Total Question: <span>{questions.length}</span>
					</p>
					<p>
						Total Score:<span> {result.score}</span>
					</p>
					<p>
						Correct Answers:<span> {result.correctAnswers}</span>
					</p>
					<p>
						Wrong Answers:<span> {result.wrongAnswers}</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default Quiz;
