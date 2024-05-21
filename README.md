# awoak_life_assessment
awoak life project repo

  This is the logic of a 3 parts project I developed for mr Bastian Gugger, a life and relationships coach who wanted to step up the functionalities of his website by implementing a series of tests to funnel Google ads visitors and introduce them to the type of services he offers.

  AWOAK TESTS
    - This is the first part of the project, it's composed of 3 tests where the user is asked to interact with various inputs to gather data to be used in the "alignment assessment"
    
  - test1: the user is asked to evaluate from 1 to 10 various aspects of his life such as job, relationships, free time and such through a series of sliders.
    
  - test2: the user is asked to sort a list of the same aspects of his life as in test1 by order of importance. One the left there is a table with a block for each life aspect and by clicking on them you remove them from the table on the left to the one on the right where they are ordered in accordance with the user inputs.
  
  - test3: the user is asked to write down 5 things that work in their life and 5 things that don't work in their life with simple input fields.
    The data from the tests is gathered and stored in a database, this part of the project uses Javascript and the Velo API provided by Wix

  AWOAK DASHBOARD
    -  This is the second part of the project, I implemented a custom dashboard on the profile page so that users could see the results of their tests displayed through a series of graphs, the user can choose to see the results single tests or the average value of multiple tests over time.
    
  This part of the project uses Javascript , the Velo API provided by Wix and the Chart.js library

  AWOAK REPORT
    - This is the third part of the project, it is a full report of the data gathered in the tests displayed in a page that can be converted and downladed as a PDF document.
    
  The data from the selected test is passed to the report page and used to render the graphs, the user can also change the set of data displayed on the graphs directly from a dropdown on the same page.
  This part of the project uses Javascript , the Velo API provided by Wix, the Chart.js library and the jsPDF library for creating a PDF using data from the report page.
