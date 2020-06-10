## Introduction
---
We'll be using:

* JavaScript's XHR object to make GET and POST requests
* Datamuse API for GET requests
* Rebrandly URL Shortener API for POST requests

Registering for Rebrandly: [Rebrandly URL Shortener API](https://www.codecademy.com/articles/rebrandly-signup)

For code used in the project, see the wordSmith directory (not in this Git repo).

## Event loop
---
Consider the following code:
```javascript
console.log('First message!');
setTimeout(() => {
   console.log('This message will always run last...');
}, 2500);
console.log('Second message!');
```

The `console.log()` statements are run from the stack, whereas `setTimeout()` is put into a queue that runs after the function in the stack are executed.

!!! note
    `setTimeout()` takes two arguments, a callback and a time in milliseconds.  The callback is `() => {...}, 2500`.

## XHR GET reqeusts
---
AJAX: "Asynchronous JavaScript and XML"  
XHR: "XMLHttpRequest"  

Example:
```javascript
// Information to reach API
const url = 'https://api.datamuse.com/words?'
const queryParams = 'rel_rhy='

// Selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// AJAX function
const getSuggestions = () => {
  const wordQuery = inputField.value;
  const endpoint = `${url}${queryParams}${wordQuery}`;
  const xhr = new XMLHttpRequest;
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderResponse(xhr.response)
    }
  }
  xhr.open('GET', endpoint);
  xhr.send();
}
```

## XHR POST requests
---
Similar to the above, the main difference being:
```javascript
    xhr.open('POST', endpoint);
    xhr.send(data);
```

## `fetch()` GET requests
---
```javascript
fetch('https://api-to-call.com/endpoint').then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Request failed!');
}, networkError => {
  console.log(networkError.message);
}).then(jsonResponse => jsonResponse);
```

## `fetch()` POST requests
---
The difference between the POST request and GET request is in the `fetch()` arguments:
```javascript
fetch('https://api-to-call.com/endpoint',
      {method: 'POST', body: JSON.stringify({id: '200'})})
```

## async GET requests
---
Using `async` is easier than using `fetch()` because it handles promises in the background.

Sample boilerplate:
```javascript
const getData = async () => {
  try {
    const response = await fetch('https://api-to-call.com/endpoint');
    if (response.ok) {
      const jsonResponse = await response.json()
      return jsonResponse;
    }
    throw new Error('Request failed!')
  } catch(error) {
    console.log(error)
  }
};
```

## async POST requests
---

Again, like GET but with data:
```javascript
const shortenUrl = async () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});
  try {
    const response = await fetch(
      url,
      {
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json',
          'apikey': apiKey
        }
      }
    )
    if (response.ok) {
      const jsonResponse = await response.json();
      renderResponse(jsonResponse);
    }
  } catch(error) {
    console.log(error);
  }
}
```


