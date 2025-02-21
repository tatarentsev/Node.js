const express = require('express');
const Joi = require('joi');
const fs = require('fs');

const app = express();
const users = [];
let uniqueID = 0;
let elID = 0;
let tempEl = 0;

app.use(express.json());

const userSchema = Joi.object({
    firstName: Joi.string().min(1).required(),
    secondName: Joi.string().min(1).required(),
    city: Joi.string().min(3).required(),
    age: Joi.number().min(0).max(105).required(),
})

app.get('/users', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) console.log(err);
        const usersTemp = JSON.parse(data);
        res.send({ usersTemp });
    })
})

app.get('/users/:id', (req, res) => {
    const userId = +req.params.id;

    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) console.log(err);
        const temp1 = JSON.parse(data);
        let elementId = 0;
        temp1.forEach(element => {
            if (element.id == userId) {
                elementId = element;
            }
        });

        if (elementId) {
            res.send(elementId);
        } else {
            res.status(404).send({ user: null });
        }
    })
})

app.post('/users/:id', (req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details });
    }

    uniqueID++;
    users.push({
        id: uniqueID,
        ...req.body
    });

    const usersJsonFile = JSON.stringify(users);
    fs.writeFileSync('data.json', usersJsonFile, (err, data) => {
        if (err) {
            console.log(err);
        } 
    });

    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) console.log(err);
        const temp = JSON.parse(data);
        temp.forEach(element => {
            elID = element;
        })
        res.send( {id: elID.id} );
    })
})

app.put('/users/:id', (req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details });
    }

    const userId = +req.params.id;
    let user = 0;

    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) console.log(err);
        const temp2 = JSON.parse(data);
        user = temp2.find(user => user.id === userId);
        
        if (user) {
            const { firstName, secondName, city, age } = req.body;
            user.firstName = firstName;
            user.secondName = secondName;
            user.city = city;
            user.age = age;

            const elementJson = JSON.parse(data);
            elementJson.forEach(element => {
                if (element.id === userId) {
                    element.firstName = firstName;
                    element.secondName = secondName;
                    element.city = city;
                    element.age = age;
                }
            });

            fs.writeFile('data.json', JSON.stringify(elementJson), (err, data) => {
                if (err) console.log(err);
                else console.log(data);
            });

            res.send({ user });
        } else {
            res.status(404).send({ user: null });
        }
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = +req.params.id;
    
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) console.log(err);

        const myData = JSON.parse(data);
        const indexOfUser = 0;
        myData.forEach(element => {
            if (element.id == userId) {
                indexOfUser = myData.indexOf(element);
            }   
        });

        delete myData[indexOfUser];
        res.send(myData);

        fs.writeFile('data.json', JSON.stringify(myData), (err, data) => {
            if (err) console.log(err);
            else console.log(data);
        })
    })

})

app.listen('3000');