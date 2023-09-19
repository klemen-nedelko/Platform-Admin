# Platform Admin
<p>For better understanding of this readme:</p>
<p>I've organized it in a way that makes information easy to find. It starts with the filename, then function name, and wraps up with a short but informative description.</p>

<h1>Frontend</h1>

<p>The project uses express server to run static html code, that removes CORS problem, follow the instructions below </p>
<p>Go into frontend folder</p>

```cd frontend```

<p>Install node modules</p>

```npm install```

<p>Start the project</p>

```npm start```

<p>The frontend part of the server is running on port 8080 (<a href="http://localhost:8080/index.html">http://localhost:8080/index.html</a>).</p>
<p>In main function you get data from the backend server, where the data is generated. On the site you can search through data in the Search box (the table updates every 300 ms, to not load the server with to many requests), and filter data with our filter options.</p>


<h2>main</h2>
<ul>
  <li>1. <b>Importing Dependencies</b></li>
  <p>Imports several JavaScript modules, including a modal component, data fetcher, table renderer, search data handler, filter options, and a configuration file.</p>
  <li>2. <b>Debounce Function</b></li>
  <p>Defines a debounce function to optimize client-side search by delaying the search execution after user input.</p>
  <li>3. <b>DOMContentLoaded Event Listener</b></li>
  <p>Listens for the DOMContentLoaded event, which triggers when the HTML document is fully loaded and parsed.</p>
  <li>4. <b>Component Initialization</b></li>
  <p>
    <ul>
      <li>Creates a modal instance for displaying a modal dialog.</li>
      <li>Sets up container ID and initializes instances for data fetching, table rendering, search handling, and filter options.</li>
      <li>Fetches initial data using the data fetcher and renders it in a table.</li>
    </ul>
  </p>
  <li>5. <b>Search Input Event Listener</b></li>
  <p>Listens for input events on the search input field, debouncing the search function to improve performance. It triggers a search when the   user types or modifies their query.</p>
  <li>6. <b>Filter Change Event Listener</b></li>
  <p>Listens for a custom <code>filterChange</code> event, which is dispatched by the filter options component when the filter is changed. It triggers a search with the current filter and query.</p>
  <li>7. <b>Create Form Submission Event Listener</b></li>
  <p>Listens for form submission on a create form. It validates form input fields, creates a new data object, adds it to the data cache, clears the form, hides the modal, and updates the table with the new data.</p>
</ul>

<h2>config</h2>
<code>config</code>
<p>This code defines a configuration object named config that maps field names to their corresponding display labels. It is likely used to specify how data should be labeled or presented in the project, providing a clear and customizable way to define how specific data attributes are shown in the user interface.</p>

<h2>dataFetcher</h2>
<p>The functions explained what are ther doing:</p>
<code>fetchData(forceRefresh = false)</code>
<p>This function goes out and collects data from a server(http://localhost:8888/data). If the data is already on the storage shelf(cache) and no one insists on getting freshs data(forceRefresh is false), it hands over the data from the sheld. If not, it gets the latest data from the server, puts it into cache, and hands it over. If something goes wrong along the way, like a delivery getting lost, it logs the issue and gives you an empty array</p>
<code>addNewDataToCache(newData)</code>
<p>Adds new data to the cache. If there's no existing data in the cache, it creates an empty array first and then appends the new data to the existing cached data.</p>
<code>getCachedData()</code>
<p>Retrives the cached data from the Map or returns empty array if there is no cached data.</p>

<h2>tableRender</h2>
<p>The functions explained what are they doing:</p>
<code>filterData(data, filter)</code>
<p>It takes a data array and a filter criteria as input, then filters the data based on the provided filter. It return a new array containing the items that match filter condition.</p>
<code>renderTable(data, config, containerId)</code>
<p>This function dynamically generates an HTML table using the provided data and configuration. It assigns the table to a specified container element indentified by its ID. It also hanldes cases where there is no data to display by showing a "No data..." message withing the table necessary.</p>
<h2>searchData()</h2>
<p>The functions explained what are they doing:</p>
<code>async fetchData(query, currentFilter)</code>
<p>Sends a request to server at <a href="http://localhost:8888/search">(http://localhost:8888/search)</a> with query parameters based on the search query and current filter. It retrieves and returns search data from the server. If there are network or server errors, it throws an error./</p>
<code>async handleSearch()</code>
<p>Retrives the search query and current filter, then calls <code>fetchData()</code> to get search results from the server. Depending on the structure of the response, it extracts the relevant data and uses the <code>tableRender</code> object to render a table with data. If there are errors, it logs them and renders an empty table.</p>
<b>Why we use async here?</b>
<p>We mark it as async because fetching data from a server, we want the code to wait until the data is ready before using it. The <code>await</code> keyword helps with this waiting process.</p>

<h2>filterOption()</h2>
<p>The functions explained what are they doing:</p>
<code>initializeFilterOptions()</code>
<p>Attaches click event listeners to all elements with the class <code>'filter-option'</code> to respond when they are clicked. It binds the <code>handleFilterOptionClick</code> function to handle these click events.</p>
<code>handleFilterOptionClick(event)</code>
<p>Responds to a click event on a filter option. It prevents the default behavior of anchor tags, removes active classes from all filter options, adds active classes to the clicked option, updates the current filter value, and dispatches a custom <b>filterChange</b> event to notify other parts of the application about the filter change.</p>

<h2>modal</h2>
<p>The functions explained what are they doing:</p>
<code>showModal()</code>
<p>Displays the modal by removing the 'hidden' class from both the modal and overlay elements, making them visible.</p>
<code>hideModa()</code>
<p>Hides the modal by adding the 'hidden' class to both the modal and overlay elements, making them invisible.</p>
<code>handleKeyPress(event)</code>
<p>Listens for the <b>'Escape'</b> key press and, if the modal is not hidden, closes the modal by calling the <code>hideModal()</code> function</p>

<h1>Backend</h1>

<p>Using basic get request to get the data from "server", and search that return searched data from our basic server</p>

<p>Go into backend folder</p>

```cd backend```

<p>Install node modules</p>

```npm install```

<p>Start the project</p>

```npm start```

<p>This code sets up a server that can filter and serve data to clients based on query parameters such as search queries and subscription types. It uses Express.js for routing and handling HTTP requests and includes functionality to read data from a JSON file and filter it accordingly before sending it back as JSON responses.</p>

<h2>server</h2>
<p>Brief explanation of what each part of the code is doing:</p>
<ul>
  <li><b>Setup and Configuration</b></li>
  <p>The code imports nexessart libaries, sets up an Express.js appliaction, and configures CORS to allow requests from <a href="http://localhost:8080">http://localhost:8080</a></p>
  <li><b>Data Filtering Functions</b></li>
    <ul>
      <li><code>filterDataBySubscruption(data, query)</code></li>
      <p>Filters data items based on the provided subscription.</p>
      <li><code>searchByQuery(data, query)</code></li>
      <p>Utilizes the Fuse.js library to perform a search for data items containing a specific query.</p>
    </ul>
  <p></p>
  <li><b>Route for Data Search (/search)</b></li>
  <p>
    <ul>
      <li>Handles GET requests to '/search'.</li>
      <li>Retrieves query and subscription parameters from the request.</li>
      <li>Reads data from a JSON file asynchronously.</li>
      <li>Filters the data based on the query and/or subscription.</li>
      <li>Sends the filtered data as a JSON response.</li>
    </ul>
  </p>
  <li><b>Route for Data Retrieval (/data)</b></li>
  <p>
    <ul>
      <li>Handles GET requests to '/data'.</li>
      <li>Reads data from a JSON file asynchronously.</li>
      <li>Sends the data as a JSON response.</li>
    </ul>
  </p>
  <li><b>Data Generation</b></li>
  <p>Creates an instance of the <code>GeneratedData</code> class, presumably to generate sample data.</p>
  <li><b>Server Start</b></li>
  <p>Starts the Express.js server on port 8888 and logs a message to indicate that it's running.</p>
</ul>
<b>Why Fuse.js library?</b>
<p>The fuse.js library is used in this code because it provides advanced fuzzy searching capabilities for text-based searches.</p>


<h2>GeneratedData</h2>
<code>Constructor (constructor(numEntries))</code>
  <ul>
    <li>Initializes the class with the number of entries to generate.</li>
    <li>Immediately triggers the <b>generateAndWriteData()</b> method to generate and write data to a file.</li>
  </ul>
<code>readCompaniesFromFile()</code>
  <ul>
    <li>Reads company data from a text file.</li>
    <li>Parses the data, splits it into lines, and formats it into an array of objects containing company names and contact information.</li>
  </ul>  
<code>getRandomPlan()</code>
<p>Randomly selects and returns a subscription plan from available options ('free' or 'paying').</p>
<code>generateRandomID()</code>
<p>Generates and returns a random alphanumeric ID of a specified length.</p>
<code>readNamesFromFile()</code>
<p>Reads names from a text file, splits them into lines, and trims whitespace.</p>
<code>readExistingDataJson()</code>
<p>Reads existing JSON data from a file or returns an empty array if no data is found.</p>
<code>isCompanyExistsInGeneratedData()</code>
<p>Checks if a company name already exists in the generated data.</p>
<code>generateRandomData()</code>
  <ul>
    <li>Generates random data entries based on company names, names, plans, and contact information.</li>
    <li>Ensures that each company name is used only once.</li>
  </ul>  
<code>checkAndDeleteExistingDataFile()</code>
  <ul>
    <li>Checks if an existing data file exists and deletes it if found.</li>
    <li>Provides a log message indicating whether the file was deleted.</li>
  </ul>
<code>generateAndWriteData(numEntries)</code>
      <ul>
        <li>Calls <b>checkAndDeleteExistingDataFile()</b> to ensure a fresh start</li>
        <li>Generates random data using <b>generateRandomData()</b>.</li>
        <li>Reads existing data, appends the new data, and writes the combined data to a JSON file</li>
        <li>Logs a success message upon completion.</li>
      </ul>
