const validateForm = (nameInput, idInput, manufactorerInput, expirationInput, quantityInput, formError)=>{
	let errors = {
		errorStatus: false,
		formError: '',
	}
	if(!nameInput || !idInput || !manufactorerInput || !expirationInput || !quantityInput){
		errors = {
			errorStatus: true,
			errorMessage:'Please fill out all the fields ⚠️',
		}
		formError.style.visibility = 'visible';
		formError.textContent = errors.errorMessage;
	} else {
		errors = {
			errorStatus: false,
			errorMessage:'',
		}
		formError.style.visibility = 'hidden';
		formError.textContent = errors.errorMessage;
	}
	const formErrorStatus = ()=>{
		return errors.errorStatus
	}
	return (formErrorStatus)
}

export default validateForm