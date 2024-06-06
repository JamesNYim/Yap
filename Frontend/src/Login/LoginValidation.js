import React from "react";

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validation(values) {
    const errors = {};
    const requestBody = {
        username: values.username,
        password: values.password
    };

    // fetch the post method from the server
    return fetch(`http://localhost:5001/login`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data.success;
        })
        .catch((error) => {
            console.error('Error:', error);
            return false;
        });
}

export default validation;