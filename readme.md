# TV Show DOM Project

Welcome to the TV Show DOM Project! In this assignment, you'll utilize your JavaScript skills to create a web app that interacts with the TVMaze API, showcasing details of TV show episodes. Follow the steps below to complete the project and deploy your website on Netlify or GitHub Pages.

## Project Requirements

### Level 100: Displaying Episode Details

1. **Create a New Repo:**

   - Initialize a new repository with the exact name: `tv-show-dom-project`.

2. **Website Content:**

   - Build a web app using HTML, CSS, and JavaScript.
   - Utilize the TVMaze API to fetch details about TV show episodes.
   - Display all episodes with the following information:

     - Episode name
     - Season number
     - Episode number
     - Medium-sized episode image
     - Episode summary text

   - Generate an episode code by combining season and episode numbers.
     - If the season or episode number was from 1 to 9, the structure should be as follows:
       S01-E09,
       A leading zero should be added before the single-digit number. If the number was greater than 9, the structure should be like this:
       S09-E25
       S10-E21

3. **Acknowledgment:**
   - Mention on your page that the data originates from TVMaze.com.
   - Provide a link back to [TVMaze](https://www.tvmaze.com) or the specific episode on that site.

### Level 200: Adding Search Functionality

1. **Live Search Input:**

   - Implement a live search input that filters episodes based on the summary or name.
   - Ensure the search is case-insensitive.
   - Display the number of episodes matching the current search.
   - Update the display immediately after each keystroke.

2. **Data Fetching Caution:**
   - If fetching episode data from the API, avoid frequent requests when using the search feature.
   - Conduct the search through an in-memory copy of the episode list.

### Level 300: Episode Selector and Multiple Movies

1. **Multiple Movies:**

   - Extend your app to include details for more than one TV show.

2. **Episode Selector:**

   - Enhance your app with an episode selector:
     - Add a select input listing all episodes in the format: "S01E01 - Winter is Coming."
     - Allow users to jump quickly to a selected episode.
     - When a selection is made, navigate the user directly to that episode in the list.

3. **Bonus (Optional):**
   - Provide an option to show only the selected episode when the selector is used.
   - Ensure users have a way to view all episodes again.

## Deployment

1. **Publish Your Website:**

   - Deploy your website on either Netlify or GitHub Pages.

2. **Netlify URL Format:**
   - If using Netlify, ensure your website URL follows this format:
     `https://aps-[[github-username]]-tv.netlify.app/`

Good luck with your project! If you encounter any issues or have questions, don't hesitate to ask for assistance.
