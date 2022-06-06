import './App.css';
import { useState } from 'react';
import * as calculateBMI from './utils/calculatebmi'
import Form from './components/form/form.component';


const App = () => {
	const [userDetails, setUserDetails] = useState({
		name: '',
		feet: 0,
		inches: 0,
		height: '',
		weight: 0,
		bmi: ''
	})

	const [bmi, setBmi] = useState(0)

	const [userPrompt, setUserPrompt] = useState('')
	const [show, setShow] = useState(false)

	const [showHeight, setShowHeight] = useState(false)
	const [showWeight, setShowWeight] = useState(false)

	const { name, feet, inches, height, weight } = userDetails

	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		})
	}

	const handleShowHeight = () => {
		setShowHeight(true)
		document.querySelector('#name-field').disabled = true
		document.querySelector('#name-field-btn').disabled = true
	}

	const handleShowWeight = () => {
		setShowWeight(true)
		document.querySelector('#height-field').disabled = true
		document.querySelector('#height-field-btn').disabled = true
	}

	const getBMI = (userWeight, feet, inches) => {
		const userWeightInkg = calculateBMI.getKg(userWeight)
		const userHeightInM = calculateBMI.getM(feet, inches)
		const bmi = Math.round(100 * (userWeightInkg / Math.pow(userHeightInM, 2))) / 100
		setBmi(bmi)
		determineBMImessage(bmi)
	}

	const determineBMImessage = (bmi) => {
		if (bmi <= 18.5) {
			setUserPrompt('underweight, please put on some muscles')
		} else if (bmi <= 24.9) {
			setUserPrompt('at a normal weight')
		} else if (bmi <= 29.9) {
			setUserPrompt('overweight! Start working out')
		} else if (bmi >= 30) {
			setUserPrompt('obese! You should consider changing your life style')
		} 
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		getBMI(weight, feet, inches)

		setShow(true)
		document.querySelector('#form-for-bmi').style.display = 'none';
	}

	const handleReset = () => {
		setShow(false)
		setUserPrompt('')
		setUserDetails({
			name: '',
			feet: '',
			inches: '',
			height: '',
			weight: '',
			bmi: ''
		})
	}


	return (
		<div className="main-wrapper">
			<Form
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				handleShowHeight={handleShowHeight}
				handleShowWeight={handleShowWeight}
				userDetails={userDetails}
				showHeight={showHeight}
				showWeight={showWeight}
			/>
			{/* <button onClick={handleReset}>Reset</button> */}
			{show ? `hi ${name}, your bio metrics: height: ${feet}'${inches}, weight: ${weight}, your bmi ${bmi}, by our calculations: you are ${userPrompt}` : ''}
		</div>);
}

export default App;
