'use client'

import { registerUser } from '@/actions/register.action'
import { handleChange } from '@/utils/form.util'
import { Button, FormControl, FormHelperText, FormLabel, Input, Sheet, Typography, IconButton } from '@mui/joy'
import Link from 'next/link'
import React from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function RegisterPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [passwordError, setPasswordError] = React.useState<string | null>(null)
  const [nameError, setNameError] = React.useState<string | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    return passwordRegex.test(password)
  }

  async function formatUser() {
    setPasswordError(null)
    setEmailError(null)
    setNameError(null)

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
    if (!nameRegex.test(formData.name)) {
      setNameError("Apenas letras são permitidos")
      return null
    }

    if (!validatePassword(formData.password)) {
      setPasswordError("A senha deve conter no mínimo 8 caracteres, 1 caractere especial, 1 número e 1 letra maiúscula")
      return null
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Senhas não coincidem")
      return null
    }

    const { emailError = false } = await registerUser(formData)

    if (emailError) {
      setEmailError("Email já cadastrado")
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Sheet
        sx={{
          width: 400,
          p: 4,
          borderRadius: 'lg',
          boxShadow: 'lg',
        }}
      >
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          Criar Conta
        </Typography>
        <form onSubmit={(e) => {
          e.preventDefault()
          formatUser()
        }}>
          <FormControl sx={{ mb: 2 }} error={!!nameError}>
            <FormLabel>Nome</FormLabel>
            <Input name="name" required defaultValue={formData.name} onChange={(e) => handleChange(e, setFormData)} />
            <FormHelperText>{nameError}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mb: 2 }} error={!!emailError}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" required defaultValue={formData.email} onChange={(e) => handleChange(e, setFormData)} />
            <FormHelperText>{emailError}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mb: 2 }} error={!!passwordError}>
            <FormLabel>Senha</FormLabel>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              defaultValue={formData.password}
              onChange={(e) => handleChange(e, setFormData)}
              endDecorator={
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ position: 'absolute', right: '0.5rem' }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              }
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }} error={!!passwordError}>
            <FormLabel>Confirmar Senha</FormLabel>
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              defaultValue={formData.confirmPassword}
              onChange={(e) => handleChange(e, setFormData)}
              endDecorator={
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  sx={{ position: 'absolute', right: '0.5rem' }}
                >
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              }
            />
            <FormHelperText>{passwordError}</FormHelperText>
          </FormControl>
          <Button type="submit" fullWidth sx={{ mb: 2 }}>
            Registrar
          </Button>
          <Link href="/login">
            <Button variant='outlined' type="button" fullWidth sx={{ mb: 2 }}>
              Cancelar
            </Button>
          </Link>
        </form>
      </Sheet>
    </div>
  )
}