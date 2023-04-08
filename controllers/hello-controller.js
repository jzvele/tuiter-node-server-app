// handles HTTP requests for a hello greeting and responds with a friendly reply

const HelloController = (app) => {

    app.get('/hello', (req, res) => {
        res.send('Life is good!')
    });

    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')
    });

}

export default HelloController;