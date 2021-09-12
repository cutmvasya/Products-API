const express = require ('express')
    , app = express()
    , dotenv = require ('dotenv')
    , cors = require ('cors')
    , router = require ('./routes/index');

app.use(cors());
app.use(express.json());
app.use('', router);

dotenv.config();
const port = process.env.PORT || 7010
    , env  = process.env.NODE_ENV || 'development';

app.use( express.urlencoded({ extended: true }) );
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: `Welcome to Playground
                '/products' to look the products thats available
                '/category' to look from the category
                Thank You :) `
    });
});

app.get('*', (req, res) => {
    res.status(404).send('Page not found!')
});

try{
    app.listen(port, () => {
        console.log(`Server is started at ${Date()} in ${env} and listening on port ${port}`);
    });
}catch(e) {
    const eMessage = `Failed to connect to port, error: ${e.message}`;
    console.log(eMessage);
}