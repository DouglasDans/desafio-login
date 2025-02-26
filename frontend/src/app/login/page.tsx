'use client'

import { authenticateUser } from '@/actions/login.action'
import { handleChange } from '@/utils/form.util'
import { Button, FormControl, FormHelperText, FormLabel, Input, Sheet, Typography } from '@mui/joy'
import Link from 'next/link'
import React from 'react'


export default function RegisterPage() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [passwordError, setPasswordError] = React.useState<string | null>(null)

  async function loginUser() {
    setEmailError(null)
    setPasswordError(null)

    const { emailError = false, passwordError = false } = await authenticateUser(formData)

    if (emailError) {
      setEmailError("Email inexistente")
    }

    if (passwordError) {
      setPasswordError("Senha inválida")
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
          Entrar
        </Typography>
        <form onSubmit={(e) => {
          e.preventDefault()
          loginUser()
        }}>
          <FormControl sx={{ mb: 2 }} error={!!emailError}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name='email' required defaultValue={formData.email} onChange={(e) => handleChange(e, setFormData)} />
            <FormHelperText>{emailError}</FormHelperText>
          </FormControl>

          <FormControl sx={{ mb: 2 }} error={!!passwordError}>
            <FormLabel>Senha</FormLabel>
            <Input type="password" name='password' required defaultValue={formData.password} onChange={(e) => handleChange(e, setFormData)} />
            <FormHelperText>{passwordError}</FormHelperText>
          </FormControl>
          <Button type="submit" fullWidth sx={{ mb: 2 }}>
            Entrar
          </Button>
          <Typography textAlign="center">
            Não tem uma conta?{' '}
            <Link href="/register" style={{ color: 'blue' }}>
              Registre-se
            </Link>
          </Typography>
        </form>
      </Sheet>
    </div>
  )
}