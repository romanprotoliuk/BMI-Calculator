const WeightField = ({ userDetails, handleChange }) => {
	return (
		<>
				<label id='label-weight' htmlFor="name">Weight</label>
			<input
					id='weight-field'
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

export default WeightField