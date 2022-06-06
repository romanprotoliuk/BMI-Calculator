import './App.css';
import { useState } from 'react';
import NameField from './components/form field components/nameField.component';
import HeightField from './components/form field components/heightField.component';
import WeightField from './components/form field components/weightField.component';

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

	const getKg = (pounds) => {
		const killoValue = 0.45359237
		const answer = pounds * killoValue
		return Math.round(10 * answer) / 10
	}

	const getM = (feet, inches) => {
		const inchesValue = 12
		const getMformulaValue = 0.0254
		let totalInches 

		const getInches = feet * inchesValue

		if (inches === null) {
			totalInches = getInches
		} else {
			totalInches = parseInt(getInches) + parseInt(inches)
		}
		const answer = totalInches * getMformulaValue
		
		return Math.round(100 * answer) / 100
	} 

	const getBMI = (userWeight, feet, inches) => {
		const userWeightInkg = getKg(userWeight)
		const userHeightInM = getM(feet, inches)
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
		document.querySelector('#name-field').style.display = 'none';
		document.querySelector('#name-field-btn').style.display = 'none';
		document.querySelector('#height-field').style.display = 'none';
		document.querySelector('#height-inches-field').style.display = 'none';
		document.querySelector('#height-field-btn').style.display = 'none';
		document.querySelector('#weight-field').style.display = 'none';
		document.querySelector('#submit-btn').style.display = 'none';
		document.querySelector('#label-name').style.display = 'none'
		document.querySelector('#label-feet').style.display = 'none'
		document.querySelector('#label-inches').style.display = 'none'
		document.querySelector('#label-weight').style.display = 'none'
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

	
	// console.log(userPrompt, bmi)

	return (
		<div className="main-wrapper">
			<h1>Hello world</h1>
			<form id="form-for-bmi" onSubmit={handleSubmit}>

				<div>
					<NameField userDetails={userDetails} handleChange={handleChange} handleShowHeight={handleShowHeight} />
				</div>
				<div>
					{showHeight ? <HeightField userDetails={userDetails} handleChange={handleChange} handleShowWeight={handleShowWeight}/> : "" }
					
				</div>
				<div>
					{	showWeight ? <WeightField userDetails={userDetails} handleChange={handleChange} /> : ""}
				</div>

				<input id='submit-btn' type="submit" />
				{/* {conditional(bmi)} */}
			</form>
			{/* <button onClick={handleReset}>Reset</button> */}
			{show ? `hi ${name}, your bio metrics: height: ${feet}'${inches}, weight: ${weight}, your bmi ${bmi}, by our calculations: you are ${userPrompt}` : ''}
		</div>);
}

export default App;
