import NameField from "../form field components/nameField.component"
import HeightField from "../form field components/heightField.component"
import WeightField from "../form field components/weightField.component"

const Form = (props) => {
  return (
    <>
      <form id="form-for-bmi" onSubmit={props.handleSubmit}>

        <div>
          <NameField userDetails={props.userDetails} handleChange={props.handleChange} handleShowHeight={props.handleShowHeight} />
        </div>
        <div>
          {props.showHeight ? <HeightField userDetails={props.userDetails} handleChange={props.handleChange} handleShowWeight={props.handleShowWeight}/> : "" }
          
        </div>
        <div>
          {	props.showWeight ? <WeightField userDetails={props.userDetails} handleChange={props.handleChange} /> : ""}
        </div>

        <input id='submit-btn' type="submit" />
      </form>
    </>
  )
}

export default Form 