// src/pages/StatsPage.jsx
import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, Divider, List, ListItem, ListItemText } from '@mui/material'

const StatsPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const logs = JSON.parse(sessionStorage.getItem('logs') || '[]')
    const shortened = logs.filter(log => log.message === 'Shortened URL created')
    const clicks = logs.filter(log => log.message === 'Redirect clicked')

    const combined = shortened.map(entry => {
      const clickEvents = clicks.filter(c => c.shortcode === entry.shortcode)
      return {
        shortcode: entry.shortcode,
        url: entry.url || entry.originalUrl,
        expiry: entry.expiry || (entry.createdAt + 30 * 60 * 1000),
        createdAt: entry.createdAt,
        clicks: clickEvents,
      }
    })

    setData(combined)
  }, [])

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      {data.length === 0 ? (
        <Typography>No data found.</Typography>
      ) : (
        data.map((item, i) => (
          <Paper key={i} sx={{ p: 2, my: 2 }}>
            <Typography variant="h6">
              🔗 Shortcode: <code>{item.shortcode}</code>
            </Typography>
            <Typography>
              🌐 URL: <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
            </Typography>
            <Typography>
              📅 Created: {new Date(item.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              ⏳ Expiry: {new Date(item.expiry).toLocaleString()}
            </Typography>
            <Typography>
              📊 Clicks: {item.clicks.length}
            </Typography>

            {item.clicks.length > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1">Click Details:</Typography>
                <List dense>
                  {item.clicks.map((click, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`🕒 ${new Date(click.timestamp).toLocaleString()}`}
                        secondary={`Referrer: ${click.referrer}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Paper>
        ))
      )}
    </Box>
  )
}

export default StatsPage
