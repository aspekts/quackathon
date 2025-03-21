import requests
from bs4 import BeautifulSoup

# URL of the DUSA events page
url = "https://www.dusa.co.uk/events"

# Send a GET request to the website
response = requests.get(url)
response.raise_for_status()  # Check if the request was successful

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Find all event cards
event_cards = soup.find_all('article', class_='tribe-events-pro-photo__event')

# List to store event details
events = []

# Loop through each event card and extract details
for card in event_cards:
    # Extract event title
    title = card.find('h3', class_='tribe-events-pro-photo__event-title').text.strip()
    
    # Extract event date
    date_tag = card.find('time', class_='tribe-events-pro-photo__event-date-tag-datetime')
    date = date_tag.text.strip() if date_tag else "Date not available"
    
    # Extract event time
    time_tag = card.find('div', class_='tribe-events-pro-photo__event-datetime')
    time = time_tag.text.strip() if time_tag else "Time not available"
    
    # Extract event link
    link_tag = card.find('a', class_='tribe-events-pro-photo__event-featured-image-link')
    link = link_tag['href'] if link_tag else "Link not available"
    
    # Extract event image
    image_tag = card.find('img', class_='tribe-events-pro-photo__event-featured-image')
    image = image_tag['src'] if image_tag else "Image not available"
    
    # Store event details in a dictionary
    event = {
        'title': title,
        'date': date,
        'time': time,
        'link': link,
        'image': image
    }
    
    # Add the event dictionary to the list
    events.append(event)

# Send the scraped data to the backend API
backend_url = "http://localhost:8000/api/upload/"
try:
    response = requests.post(backend_url, json=events)
    response.raise_for_status()  # Check if the POST request was successful
    print("Data successfully sent to the backend!")
except requests.exceptions.RequestException as e:
    print(f"Failed to send data to the backend: {e}")