const mongoose = require('mongoose')
const prompt = require('prompt-sync')()
require('dotenv').config()
const Customer = require('./models/Customer')

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
}

const name = prompt('What is your name')
console.log(`Your name is ${name}`)

const askChoices = () => {
  console.log(
    '\n What would you like to do? \n',
    '1. Create a customer?\n',
    '2. View All Customers?\n',
    '3. Update Customer Info?\n',
    '4. Delete a customer?\n',
    '5. Quit?\n'
  )

  const selection = prompt('make the number of action to run: ')
  return parseInt(selection)
}

const createCustomers = async () => {
  const name = prompt('Customer Name: ')
  const age = prompt('Customer Age: ')
  const customer = await Customer.create({ name, age })
  console.log('Customer added with details:', customer)
}

const viewCustomers = async () => {
  const customers = await Customer.find()
  console.log('Customers List: ', customers)
}

const updateCustomers = async () => {
  const id = prompt('Enter the customer ID that you want to update: ')
  const name = prompt('Enter the name: ')
  const age = prompt('Enter the age: ')
  const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, age })
  console.log('Customer Updated!')
}

const deleteCustomers = async () => {
  const id = prompt('Enter the customer ID that you want to delete: ')
  const deletedCustomer = await Customer.findByIdAndDelete(id)
  console.log('Customer Deleted!', deletedCustomer)
}

const choices = async () => {
  let choices = askChoices()
  console.log(choices)

  switch (choices) {
    case 1:
      await createCustomers()
      break
    case 2:
      await viewCustomers()
      break
    case 3:
      await updateCustomers()
      break
    case 4:
      await deleteCustomers()
      break
    case 5:
      console.log('Done')
      mongoose.connection.close()
      break
    default:
      console.log('Incorrect Choice.')
  }
}

choices()
connect()
