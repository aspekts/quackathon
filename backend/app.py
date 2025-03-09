from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from spareroom.src.spareroom import SpareRoom

# Initialize Flask app
app = Flask(__name__)

# Function to scrape DUSA events
def scrape_dusa_events():
    url = "https://www.dusa.co.uk/events"
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, 'html.parser')
    event_cards = soup.find_all('article', class_='tribe-events-pro-photo__event')
    events = []
    for card in event_cards:
        title = card.find('h3', class_='tribe-events-pro-photo__event-title').text.strip()
        date_tag = card.find('time', class_='tribe-events-pro-photo__event-date-tag-datetime')
        date = date_tag.text.strip() if date_tag else "Date not available"
        time_tag = card.find('div', class_='tribe-events-pro-photo__event-datetime')
        time = time_tag.text.strip() if time_tag else "Time not available"
        link_tag = card.find('a', class_='tribe-events-pro-photo__event-featured-image-link')
        link = link_tag['href'] if link_tag else "Link not available"
        image_tag = card.find('img', class_='tribe-events-pro-photo__event-featured-image')
        image = image_tag['src'] if image_tag else "Image not available"
        event = {
            'title': title,
            'date': date,
            'time': time,
            'link': link,
            'image': image
        }
        events.append(event)
    return events

def scrape_dundee_events():
    url = "https://www.dundee.ac.uk/events/"
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, 'html.parser')
    event_cards = soup.find_all('article', class_='card--event')
    events = []
    for card in event_cards:
        title = card.find('div', class_='card__title').text.strip()
        date = card.find('time', class_='card__date').text.strip()
        time = card.find('time', class_='card__time').text.strip()
        link = card.find('a', class_='card__link')['href']
        image = card.find('img', class_='card__image')['src']
        event = {
            'title': title,
            'date': date,
            'time': time,
            'link': link,
            'image': image
        }
        events.append(event)
    return events

# Function to scrape SpareRoom listings
def scrape_spareroom_listings():
    search_url = '/search.pl?nmsq_mode=normal&action=search&max_per_page=&flatshare_type=offered&search=Dundee&min_rent=100&max_rent=200&per=pw&available_search=N&day_avail=02&mon_avail=05&year_avail=2023&min_term=0&max_term=0&days_of_wk_available=7+days+a+week&showme_rooms=Y'
    spare_room = SpareRoom(search_url, entries_to_scrape=30)
    listings = spare_room.get_rooms()
    return [listing.__dict__ for listing in listings]

# Flask route to display scraped DUSA events
@app.route('/api/DUSAevents', methods=['GET'])
def get_events():
    try:
        events = scrape_dusa_events()
        return jsonify(events)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Flask route to display scraped SpareRoom listings
@app.route('/api/spareroom', methods=['GET'])
def get_spareroom_listings():
    try:
        listings = scrape_spareroom_listings()
        return jsonify(listings)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Flask route to display scraped Dundee events
@app.route('/api/dundeeevents', methods=['GET'])
def get_dundee_events():
    try:
        events = scrape_dundee_events()
        return jsonify(events)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=False)
