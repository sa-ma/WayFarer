import express from 'express';
import cors from 'cors';
import route from './routes/index';

const app = express();

// Initialize Middleware
app.use(express.json({ extended: false }));


// CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// API version 1
app.use('/api/v1', route);

app.use('*', (req, res) => res.status(404).json({
  status: 404,
  message: 'Endpoint not found, Please check your url again...'
}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on localhost:${port}`));

export default app;
