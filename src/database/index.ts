import {createConnection} from 'typeorm';

try {
    createConnection();
    console.log('database connected');
} catch (err) {
    console.log(err);
}