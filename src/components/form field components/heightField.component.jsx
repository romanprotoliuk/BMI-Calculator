const HeightField = ({ userDetails, handleChange, handleShowWeight  }) => {
	return (
		<>
				<label id='label-feet' htmlFor="feet">Feet</label>
				<input
					id='height-field'
					required
					type="text"
					autoComplete='off'
					value={userDetails.feet}
					name="feet"
					onChange={handleChange}
				/>

				<label id='label-inches' htmlFor="inches">Inches</label>
			<input
					id='height-inches-field'
					required
					type="text"
					autoComplete='off'
					value={userDetails.inches}
					name="inches"
					onChange={handleChange}
			/>
			<button id='height-field-btn' onClick={handleShowWeight}>next</button>
		</>
	)
}

export default HeightField

