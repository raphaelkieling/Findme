const app = require('./src');
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Listening in port ${PORT}`);
})