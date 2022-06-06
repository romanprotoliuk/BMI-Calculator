const NameField = ({ userDetails, handleChange, handleShowHeight }) => {
	return (
			<>
				<label id='label-name' htmlFor="name">Name</label>
				<input
					id='name-field'
					required
					type="text"
					autoComplete='off'
					value={userDetails.name}
					name="name"
					onChange={handleChange}
			/>
				<button id='name-field-btn' onClick={handleShowHeight}>next</button>
			</>
	)
}

export default NameField