// src/pages/UrlShortenerPage.jsx
import React, { useState } from 'react'
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material'
import { generateShortcode, isValidUrl, isValidShortcode } from '../utils/shortener'
import logEvent from '../middleware/logger'

const UrlShortenerPage = () => {
  const [inputs, setInputs] = useState([
    { url: '', validity: '', shortcode: '', error: '' }
  ])
  const [shortenedLinks, setShortenedLinks] = useState([])

  const handleChange = (index, field, value) => {
    const updatedInputs = [...inputs]
    updatedInputs[index][field] = value
    updatedInputs[index].error = ''
    setInputs(updatedInputs)
  }

  const handleAddInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '', error: '' }])
    }
  }

  const handleShorten = () => {
    const results = []
    const updatedInputs = [...inputs]

    updatedInputs.forEach((input, index) => {
      const { url, validity, shortcode } = input

      // URL validation
      if (!url || !isValidUrl(url)) {
        updatedInputs[index].error = 'Invalid URL'
        return
      }

      // Shortcode validation
      let finalShortcode = shortcode.trim()
      if (finalShortcode) {
        if (!isValidShortcode(finalShortcode)) {
          updatedInputs[index].error = 'Invalid shortcode (3–12 alphanumeric chars)'
          return
        }
        const existing = shortenedLinks.find(item => item.shortcode === finalShortcode)
        if (existing) {
          updatedInputs[index].error = 'Shortcode already exists'
          return
        }
      } else {
        finalShortcode = generateShortcode()
      }

      // Validity in minutes
      const validFor = parseInt(validity)
      const expiry = Date.now() + ((isNaN(validFor) ? 30 : validFor) * 60 * 1000)

      const shortObj = {
        originalUrl: url,
        shortcode: finalShortcode,
        expiry,
        createdAt: Date.now(),
        clicks: []
      }

      logEvent('Shortened URL created', { shortcode: finalShortcode, url })

      results.push(shortObj)
    })

    setShortenedLinks(prev => [...prev, ...results])
    setInputs([{ url: '', validity: '', shortcode: '', error: '' }])
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      {inputs.map((input, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Long URL"
                value={input.url}
                onChange={e => handleChange(index, 'url', e.target.value)}
                error={!!input.error}
                helperText={input.error}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Validity (mins)"
                value={input.validity}
                onChange={e => handleChange(index, 'validity', e.target.value)}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Custom Shortcode (optional)"
                value={input.shortcode}
                onChange={e => handleChange(index, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      {inputs.length < 5 && (
        <Button variant="outlined" onClick={handleAddInput} sx={{ mb: 2 }}>
          + Add Another URL
        </Button>
      )}

      <Button variant="contained" onClick={handleShorten}>
        Shorten URLs
      </Button>

      <Box mt={4}>
        <Typography variant="h6">Shortened URLs:</Typography>
        {shortenedLinks.map((link, i) => (
          <Paper key={i} sx={{ p: 2, my: 1 }}>
            <Typography>
              🔗 <strong>Shortcode:</strong> <code>{link.shortcode}</code>
            </Typography>
            <Typography>
              🌐 <strong>Original URL:</strong> <a href={link.originalUrl} target="_blank">{link.originalUrl}</a>
            </Typography>
            <Typography>
              ⏳ <strong>Expires At:</strong> {new Date(link.expiry).toLocaleString()}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}

export default UrlShortenerPage
