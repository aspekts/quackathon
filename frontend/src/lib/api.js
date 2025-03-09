// fetch webscraped data from backend on localhost :5000
export function handleDusa() {
    return fetch('http://localhost:5000/api/DUSAevents',{mode: 'no-cors'})
        .then((res) => res.json())
        .then((data) => data);
    };
export function handleSpareRoom() {
    return fetch('http://localhost:5000/api/spareroom', {
        mode: 'no-cors',
        include: 'credentials',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },

    })
        .then((res) => res.json())
        .then((data) => data);
    }
