'use client'

import { registerUser } from '@/actions/register.action'
import { handleChange } from '@/utils/form.util'
import { Button, FormControl, FormHelperText, FormLabel, Input, Sheet, Typography } from '@mui/joy'
import Link from 'next/link'
import React from 'react'

export default function RegisterPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [passwordError, setPasswordError] = React.useState<string | null>(null)

  async function formatUser() {
    setPasswordError(null)
    setEmailError(null)
    console.log(formData);

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
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Nome</FormLabel>
            <Input name="name" required defaultValue={formData.name} onChange={(e) => handleChange(e, setFormData)} />
          </FormControl>
          <FormControl sx={{ mb: 2 }} error={!!emailError}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" required defaultValue={formData.email} onChange={(e) => handleChange(e, setFormData)} />
            <FormHelperText>{emailError}</FormHelperText>
          </FormControl>
          <FormControl sx={{ mb: 2 }} error={!!passwordError}>
            <FormLabel>Senha</FormLabel>
            <Input name="password" type="password" required defaultValue={formData.password} onChange={(e) => handleChange(e, setFormData)} />
          </FormControl>
          <FormControl sx={{ mb: 2 }} error={!!passwordError}>
            <FormLabel>Confirmar Senha</FormLabel>
            <Input name="confirmPassword" type="password" required defaultValue={formData.confirmPassword} onChange={(e) => handleChange(e, setFormData)} />
            <FormHelperText>{passwordError}</FormHelperText>
          </FormControl>
          <Button type="submit" fullWidth sx={{ mb: 2 }}>
            Registrar
          </Button>
          <Typography textAlign="center">
            Já tem uma conta?{' '}
            <Link href="/login" style={{ color: 'blue' }}>
              Faça login
            </Link>
          </Typography>
        </form>
      </Sheet>
    </div>
  )
}