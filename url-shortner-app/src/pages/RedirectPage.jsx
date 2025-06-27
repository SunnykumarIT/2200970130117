// src/pages/RedirectPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, CircularProgress, Button } from '@mui/material'
import logEvent from '../middleware/logger'

const RedirectPage = () => {
  const { shortcode } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const logs = JSON.parse(sessionStorage.getItem('logs') || '[]')

    // Find the most recent URL creation with this shortcode
    const matchedLink = [...logs]
      .reverse()
      .find(log => log.message === 'Shortened URL created' && log.shortcode === shortcode)

    if (!matchedLink) {
      setError('Shortcode not found.')
      setStatus('error')
      return
    }

    const now = Date.now()
    const expiryTime = matchedLink.expiry || (matchedLink.createdAt + 30 * 60 * 1000)

    if (now > expiryTime) {
      setError('This link has expired.')
      setStatus('error')
      return
    }

    // Log the redirect
    logEvent('Redirect clicked', {
      shortcode,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'Direct',
    })

    setStatus('redirecting')

    setTimeout(() => {
      window.location.href = matchedLink.url || matchedLink.originalUrl
    }, 1000)
  }, [shortcode])

  if (status === 'loading') {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>Checking your link...</Typography>
      </Box>
    )
  }

  if (status === 'error') {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Shortener
        </Button>
      </Box>
    )
  }

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h5">Redirecting you...</Typography>
    </Box>
  )
}

export default RedirectPage
