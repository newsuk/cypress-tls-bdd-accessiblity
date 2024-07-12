# Google PageSpeed Insights API 

Script to extract Google PageSpeed API Data from multiple URLs. This script allows you to run multiple tests on different URLs and then calculates the median value for each speed metric and Core Web Vitals metric from all the results obtained.

## How to install and run the script

1. This script uses ES modules syntax. Make sure that you have installed Node.js version 14 or higher. 
   
2. Clone/Download the repository. 

3. Install the modules from the script. Type in your terminal:

   ```bash
   npm install
   ```

4. Add URLs into the 'urls.csv' file but keep the "url" header.
5. You can change the number of tests per URL you'd like to perform. Change the variable `numTest` in Line 14 to your desired number of tests. Maximum recommended 5.
   ```javascript
   // Example tu run 3 lab tests
   const numTest = 3; // Number of Lab test to run (Lighthouse). 
   ```
6. You can also change the device variable between mobile and desktop if you want to get different viewport results. By default, the test will run on both devices.
7. Run the script. Type in your terminal:
   ```bash
   npm start
   ```

## The output

Once the script has finished, you will find the output under the "results" folder. 

These files will contain the lab metrics for each succesful test result from the URLs in your 'urls.csv' file. The metrics extarcted are:

- Time To First Byte in milisenconds (TTFB)
- First Contentful Paint in miliseconds (labFCP)
- Largest Contentful Paint in miliseconds (labLCP)
- Cummulative Layout Shift (labCLS)
- Performance
- SEO
- accessibility
- Speed Index in miliseconds (speedIndex)
- Total Blocking Time in miliseconds (TBT)
- Max Potential First Input Delay in miliseconds (labMaxFID)
- Size fo the page in Megabytes(pageSize)



The "results-median" files are the median values for each lab metric extracted as long as there were a minimum of 2 rounds of testing performed.

## CrUX data

Currently, the tool only records the lab data, not the CrUX data. In future enhancements, we will record the CrUX data too.