import React, { useState } from 'react'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from '@mui/material'
import './form.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const dbUrl = 'https://squarefoot-adda-default-rtdb.firebaseio.com/'
// const dbUrl = 'https://sqf-adda-1876c-default-rtdb.firebaseio.com/'

const Form = ({ projectName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agree: false,
    projectName: projectName,
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length === 0) {
      setErrors({})

      try {
        await axios.post(`${dbUrl}/userdata.json`, formData)
        toast.success('Form submitted successfully!', {
          autoClose: 2000,
        })
        setFormData(prevFormData => ({
          ...prevFormData,
          name: '',
          email: '',
          phone: '',
          agree: false,
        }))
      } catch (error) {
        toast.error('Failed to submit the form. Please try again later.')
      }
    } else {
      setErrors(validationErrors)
    }
  }

  const handleFormData = e => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: fieldValue,
    }))
  }

  const validateForm = data => {
    const errors = {}

    if (!data.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required'
    } else if (!isValidEmail(data.email.trim())) {
      errors.email = 'Invalid email address'
    }

    if (!data.phone.trim()) {
      errors.phone = 'Phone is required'
    } else if (!isValidPhone(data.phone.trim())) {
      errors.phone = 'Invalid phone number'
    }
    return errors
  }

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = phone => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
  }

  return (
    <Box className="form-wrapper">
      <Typography variant="h4" component="h4" mb={2} color="#ff5a3c">
        Submit Your Details
      </Typography>
      <form onSubmit={handleSubmit} method="POST">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleFormData}
          fullWidth
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          value={formData.email}
          name="email"
          onChange={handleFormData}
          fullWidth
          margin="normal"
          required
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Phone"
          value={formData.phone}
          name="phone"
          type="number"
          onChange={handleFormData}
          fullWidth
          margin="normal"
          InputProps={{
            sx: {
              '&:hover': {
                borderColor: 'initial',
              },
              '&:focus': {
                borderColor: 'initial',
                boxShadow: 'none',
              },
            },
          }}
          required
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="agree"
              checked={formData.agree}
              onChange={handleFormData}
              sx={{
                color: '#ff5a3c',
                '&.Mui-checked': {
                  color: '#ff5a3c',
                },
              }}
            />
          }
          label="I agree to receive a call from the sales team on this number"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default Form
