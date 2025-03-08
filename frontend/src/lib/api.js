// fetch webscraped data from backend on localhost :5000
export function handleDusa() {
    return fetch('http://localhost:5000/dusa_events')
        .then((res) => res.json())
        .then((data) => data);
    };
export function handleSpareRoom() {
    return fetch('http://localhost:5000/spare_room')
        .then((res) => res.json())
        .then((data) => data);
    }
export function handleBuddies() {
    return fetch('http://localhost:5000/buddies')
        .then((res) => res.json())
        .then((data) => data);
    }