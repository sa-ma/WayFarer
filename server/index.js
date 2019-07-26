import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerui from 'swagger-ui-express';
import route from './routes/index';
import swaggerDocument from '../swagger.json';

const app = express();

// Initialize Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API documentation
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument));

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
  status: 'error',
  message: 'Endpoint not found, Please check your url again...'
}));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on localhost:${port}`));

export default app;
