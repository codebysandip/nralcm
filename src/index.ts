import app from "./App";

const port = process.env.PORT || 4800;

app.listen(port, (err: any) => {
    if (err) {
        return console.log("Error while creating server ", err);
    }

    return console.log(`Server listening on port ${port}`);
});