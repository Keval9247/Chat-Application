import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { AppBar, Box, Button, Container, Grid, List, ListItem, ListItemText, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material';

const socket = io.connect("http://localhost:1654/");

export default function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("")
  const [socketid, setsocketid] = useState("")
  const [list, setlist] = useState([])
  console.log(list);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
    setRoom("");
  }

  useEffect(() => {
    socket.on('connect', () => {
      setsocketid(socket.id)
      console.log('Connected to server and server id:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log("Disconnected from server");
    });

    socket.on('wel', (a) => {
      console.log(a);
    });

    socket.on('receive-message', (a) => {
      console.log("Message received:", [a]);
      if (!list.includes(a)) {
        // If not, add it to the list
        setlist(prevList => [...prevList, a]);
      }
    });

    return () => {
      if (!socket) {
        socket.disconnect();
        socket.off('receive-message');
      }
    };
  }, [list]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Socket.io Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography component="div" variant="h6" gutterBottom>
                Welcome to Socket.io
              </Typography>
              <Typography variant="body1" gutterBottom>
                Socket ID: {socketid}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      label="Message" 
                      variant="outlined" 
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      value={room} 
                      onChange={(e) => setRoom(e.target.value)} 
                      label="Room" 
                      variant="outlined" 
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', overflowY: 'auto' }}>
              <Typography variant="h6" gutterBottom>
                Messages
              </Typography>
              <List>
                {list.map((m, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={`Message: ${m}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
