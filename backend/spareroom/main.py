import csv
from src.spareroom import SpareRoom, read_existing_rooms_from_spreadsheet, append_new_rooms_to_spreadsheet

# -- Configuration --
# Set file path for the spreadsheet
filename = 'spareroom_listing.csv'

#! Note that %i is used for min and max rent to be substituted with the values below
search_url = '/search.pl?nmsq_mode=normal&action=search&max_per_page=&flatshare_type=offered&search=Dundee&min_rent=%i&max_rent=%i&per=pw&available_search=N&day_avail=02&mon_avail=05&year_avail=2023&min_term=0&max_term=0&days_of_wk_available=7+days+a+week&showme_rooms=Y'
min_rent_pw = 100
max_rent_pw = 200
entries_to_scrape = 30 # Number of entries to scrape

def main():
    # Read the existing rooms from the spreadsheet
    existing_rooms_df = read_existing_rooms_from_spreadsheet(filename)

    # Instantiate SpareRoom and get new rooms
    spare_room = SpareRoom(search_url, min_rent_pw, max_rent_pw, entries_to_scrape)
    new_rooms = spare_room.get_rooms(previous_rooms=existing_rooms_df)

    # Filter out rooms that already exist in the spreadsheet
    filtered_new_rooms = []
    for room in new_rooms:
        if existing_rooms_df.empty:
            filtered_new_rooms.append(room)
        elif room.id not in existing_rooms_df['id'].values:
            filtered_new_rooms.append(room)

    # Append new rooms to the spreadsheet
    append_new_rooms_to_spreadsheet(existing_rooms_df, filtered_new_rooms, filename)
    print(f'[+] Resuls saved: ./{filename}')

if __name__ == "__main__":
    main()