const prescription = [];
const nonPrescription = [];

//Selecting elements from the DOM
const medicationForm = document.querySelector('.medication-form')
const displayPrescriptionContainer = document.querySelector('.display-prescription')
const displayNonPrescriptionContainer = document.querySelector('.display-non-prescription')
const prescriptionUl = document.querySelector('.display-prescription-list')
const nonPrescriptionUl = document.querySelector('.display-non-prescription-list')
const submitButton = document.querySelector('.submit-button')

const renderPrescriptionButton = document.querySelector('.render-prescription-button')
const renderNonPrescriptionButton = document.querySelector('.render-non-prescription-button')

const name = document.querySelector('.name')
const id = document.querySelector('.id')
const manufactorer = document.querySelector('.manufactorer')
const expiration = document.querySelector('.expiration')
const quantity = document.querySelector('.quantity')
const selectElement = document.querySelector('.type')

const formError = document.querySelector('.error-message')


// Load local storage when page is refreshed
document.addEventListener('DOMContentLoaded', () => {
    const prescriptionFromStorage = JSON.parse(localStorage.getItem('prescription'));
    const nonPrescriptionFromStorage = JSON.parse(localStorage.getItem('nonPrescription'));

    if (prescriptionFromStorage) {
        prescription.push(...prescriptionFromStorage);
    }

    if (nonPrescriptionFromStorage) {
        nonPrescription.push(...nonPrescriptionFromStorage);
    }

    UI.renderPrescription(prescription);
    UI.renderNonPrescription(nonPrescription);
});

//Submit form
medicationForm.addEventListener('submit', (e)=>{
	e.preventDefault();

	if (!name.value || !id.value || !manufactorer.value || !expiration.value || !quantity.value || !selectElement.value) {
        formError.textContent = 'Please fill out all the fields ⚠️';
        return; // Stop form submission
    }

	let newMedication;

	if(selectElement.value === 'prescription'){
		newMedication = new Prescription(name.value, id.value, manufactorer.value, expiration.value, quantity.value, selectElement.value);
	} else{
		newMedication = new NonPrescription(name.value, id.value, manufactorer.value, expiration.value, quantity.value, selectElement.value);	
	}
	
	Prescription.addMedication(newMedication)
	console.log(newMedication);

	// Clear any previous error messages
	 formError.textContent = '';

	// Save medications to local storage after adding new medication
	saveMedicationsToLocalStorage();

})

// Function to store madications to local storage
function saveMedicationsToLocalStorage(){
	localStorage.setItem('prescription', JSON.stringify(prescription));
    localStorage.setItem('nonPrescription', JSON.stringify(nonPrescription))
   }

//Render information on screen

renderPrescriptionButton.addEventListener('click', ()=>{
	UI.activeTab = 'prescription'
	UI.renderPrescription(prescription)
})

renderNonPrescriptionButton.addEventListener('click', ()=>{
	UI.activeTab = 'Non-prescription'
	UI.renderNonPrescription(nonPrescription)
})

//Declaring the prescription class

class Prescription {
	constructor(name, id, manufactorer, expiration, quantity, type){
		this.name = name;
		this.id = id;
		this.manufactorer = manufactorer;
		this.expiration = expiration;
		this.quantity = quantity;
		this.type = type;
		this.ID = Date.now();
	}
	static addMedication(medication){
		if(medication.type === 'prescription'){
			prescription.push(medication)
		} else{
			nonPrescription.push(medication)
		}
	}
	static deleteMedication(id){
        const index = prescription.findIndex(prescription => prescription.ID.toString() === id.toString());
        if(index !== -1){
            prescription.splice(index, 1);
            UI.renderPrescription(prescription); // Render the updated list
        }
	}
}

//Declaring the non prescription class

class NonPrescription extends Prescription{
	constructor(name, id, manufactorer, expiration, quantity, type){
		super(name, id, manufactorer, expiration, quantity, type);
		this.ID = Date.now();
	}
	static deleteMedication(id){
        const index = nonPrescription.findIndex(nonPrescription => nonPrescription.ID.toString() === id.toString());
        if(index !== -1){
            nonPrescription.splice(index, 1);
            UI.renderNonPrescription(nonPrescription); // Render the updated list
        }
	}
}
	


// Declaring the Ul class

class UI{
	static activeTab = 'prescription';
	static renderPrescription(prescription){
		prescriptionUl.textContent = '';
		displayNonPrescriptionContainer.style.display = 'none';
		displayPrescriptionContainer.style.display = 'block';
		if(UI.activeTab === 'prescription'){
			prescription.forEach(prescription => {
				const liRow = document.createElement('li');
				const renderName = document.createElement('span');
				const renderId = document.createElement('span');
				const renderManufactorer = document.createElement('span');
				const renderExpiration = document.createElement('span');
				const renderQuantity = document.createElement('span');
				const renderType = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button')

				renderName.textContent = prescription.name;
				renderId.textContent = prescription.id;
				renderManufactorer.textContent = prescription.manufactorer;
				renderExpiration.textContent = prescription.expiration;
				renderQuantity.textContent = prescription.quantity;
				renderType.textContent = prescription.type;
				deleteButton.textContent = 'Delete'

				liRow.classList.add('prescription-row')
				liRow.dataset.id = prescription.ID;

				prescriptionUl.append(liRow);
				liRow.append(renderName, renderId, renderManufactorer, renderExpiration, renderQuantity, renderType, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton)

				deleteButton.addEventListener('click', (e)=>{
					const rowId = e.currentTarget.parentElement.parentElement.dataset.id
					Prescription.deleteMedication(rowId, prescription)
				})
			})
		}
	}
	static renderNonPrescription(nonPrescription){
		nonPrescriptionUl.textContent = '';
		displayNonPrescriptionContainer.style.display = 'block';
		displayPrescriptionContainer.style.display = 'none';
		if(UI.activeTab === 'Non-prescription'){
			nonPrescription.forEach(nonPrescription => {
				const liRow = document.createElement('li');
				const renderName = document.createElement('span');
				const renderId = document.createElement('span');
				const renderManufactorer = document.createElement('span');
				const renderExpiration = document.createElement('span');
				const renderQuantity = document.createElement('span');
				const renderType = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button')

				renderName.textContent = nonPrescription.name;
				renderId.textContent = nonPrescription.id;
				renderManufactorer.textContent = nonPrescription.manufactorer;
				renderExpiration.textContent = nonPrescription.expiration;
				renderQuantity.textContent = nonPrescription.quantity;
				renderType.textContent = nonPrescription.type;
				deleteButton.textContent = 'Delete'

				liRow.classList.add('non-prescription-row')
				liRow.dataset.id = nonPrescription.ID;

				nonPrescriptionUl.append(liRow);
				liRow.append(renderName, renderId, renderManufactorer, renderExpiration, renderQuantity, renderType, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton)

				deleteButton.addEventListener('click', (e)=>{
					const rowId = e.currentTarget.parentElement.parentElement.dataset.id
					NonPrescription.deleteMedication(rowId, nonPrescription)
				})
			})
		}
	}
}

deleteButton.addEventListener('click', (e)=>{
    const rowId = e.currentTarget.parentElement.parentElement.dataset.id;
    if (UI.activeTab === 'prescription') {
        Prescription.deleteMedication(rowId);
    } else {
        NonPrescription.deleteMedication(rowId);
    }
});
