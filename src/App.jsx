import './App.css';
import { useState } from 'react';

const NameField = ({ userDetails, handleChange }) => {
	return (
			<>
				<label htmlFor="name">Name</label>
				<input
					required
					type="text"
					autoComplete='off'
					value={userDetails.name}
					name="name"
					onChange={handleChange}
				/>
			</>
	)
}

const HeightField = ({ userDetails, handleChange }) => {
	return (
		<>
				<label htmlFor="feet">Feet</label>
				<input
					required
					type="text"
					autoComplete='off'
					value={userDetails.feet}
					name="feet"
					onChange={handleChange}
				/>

				<label htmlFor="inches">Inches</label>
				<input
					required
					type="text"
					autoComplete='off'
					value={userDetails.inches}
					name="inches"
					onChange={handleChange}
			/>
		</>
	)
}

const WeightField = ({ userDetails, handleChange }) => {
	return (
		<>
				<label htmlFor="name">Weight</label>
				<input
					required
					type="text"
					autoComplete='off'
					value={userDetails.weight}
					name="weight"
					onChange={handleChange}
			/>
		</>
	)
}

const App = () => {
	const [userDetails, setUserDetails] = useState({
		name: '',
		feet: '',
		inches: '',
		height: '',
		weight: '',
		bmi: ''
	})
	const [userPrompt, setUserPrompt] = useState('')
	const [show, setShow] = useState(false)
	// const [userAllInfo, setUserAllInfo] = useState('')

	const { name, feet, inches, height, weight, bmi } = userDetails

	
	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		})
		determineBMImessage(bmi)
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
			totalInches = getInches + inches
		}
		
		const answer = totalInches * getMformulaValue
		
		return Math.round(100 * answer) / 100
	} 



	const getBMI = (userWeight, feet, inches) => {
		const userWeightInkg = getKg(userWeight)
		const userHeightInM = getM(feet, inches)
		const bmi = Math.round(100 * (userWeightInkg / Math.pow(userHeightInM, 2))) / 100
		setUserDetails({
			...userDetails,
			bmi: bmi
		})
	}

	const determineBMImessage = (bmi) => {
		if (bmi <= 18.5) {
			setUserPrompt('underweight, please put on some muscles')
		} else if (bmi >= 18.5 && bmi <= 24.9) {
			setUserPrompt('at a normal weight')
		} else if (bmi >= 25 && bmi <= 29.9) {
			setUserPrompt('overweight! Start working out')
		} else if (bmi >= 30) {
			setUserPrompt('obese! You should consider changing your life style')
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const bmiNumber = getBMI(Number(weight), Number(feet), Number(inches))
		determineBMImessage(bmiNumber)
		setShow(true)
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

	
	console.log(userPrompt, bmi)

	return (
		<div className="main-wrapper">
			<h1>Hello world</h1>
			<form onSubmit={handleSubmit}>

				<div>
					<NameField userDetails={userDetails} handleChange={handleChange} />
				</div>
				<div>
					<HeightField userDetails={userDetails} handleChange={handleChange} />
				</div>
				<div>
					<WeightField userDetails={userDetails} handleChange={handleChange} />
				</div>

				<input type="submit" />
				{/* {conditional(bmi)} */}
			</form>
			<button onClick={handleReset}>Reset</button>
			{show ? `hi ${name}, your bio metrics: height: ${feet}'${inches}, weight: ${weight}, your bmi ${bmi}, by our calculations: you are ${userPrompt}` : ''}
		</div>);
}

export default App;
