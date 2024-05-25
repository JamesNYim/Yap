import React from "react";

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validation(values) {
    const errors = {};

    // fetch the post method from the server
    return fetch(`http://localhost:5001/login/get?login=${values.username}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (email_pattern.test(values.username)) {
                if (data.email === values.username) {
                    return data.email === values.email;
                } else if (data.username === values.username) {
                    return data.username === values.username;
                }
            } else {
                return false
            }
        })
        .catch((error) => console.error('Error:', error));
}

export default validation;