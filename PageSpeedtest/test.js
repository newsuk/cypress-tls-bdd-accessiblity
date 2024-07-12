/* Modules */
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import csv from "csvtojson";
import { parse } from "json2csv";
import { apiRequest } from "./api-request.js";
import moment from "moment";
import { median } from "./median-math.js";

/* Variables */
const file = "urls.csv"; // File name for list of URLs to check
const folder = "results"; // Name of folder for output
const fullJson = true; // Variable for testing purposes. Extracts full API response into JSON File
const numTest = 1; // Number of Lab test to run (Lighthouse)
const device_list = ["mobile", "desktop"]; //

////* Start of script *////
console.time();
// Create results folder
if (!existsSync(`./${folder}/`)) {
  await mkdir(`${folder}`);
}

const getUrls = async () => {
  const list = await csv().fromFile(file);
  return list.map(({ url }) => url);
};

const getSpeedData = async (testNum = 1) => {
  // Get URL List
  const urlList = await getUrls().catch((err) =>
    console.log(`Error reading file ${err}`)
  );

  console.log(`Processing ${urlList.length} URL/s`);

  // Holding arrays for results
  const labDataRes = [];
  const labResErrors = [];

  // Loop through URLs
  for (let device of device_list) {
    for (let round = 0; round < testNum; round++) {
      for (let url of urlList) {
        console.log(`Testing round #${round + 1} for URL ${url} on ${device}`);
        try {
          const res = await apiRequest(url, device);

          if (fullJson === true) {
            !existsSync(`./${folder}/json/`) ? mkdir(`${folder}/json`) : null;
            writeFile(
              `${folder}/json/resp-${round + 1}.json`,
              JSON.stringify(res, null, 2)
            );
          }

          const labAudit = res.lighthouseResult.audits;
          const testUrl = res.lighthouseResult.finalUrl;
          const device_type = device;
          const TTFB = labAudit["server-response-time"].numericValue / 1000;
          //const TTI = labAudit.metrics.details?.items[0].interactive ?? 'no data';
          const FCP =
            (labAudit.metrics.details?.items[0].firstContentfulPaint ??
              "no data") / 1000;
          const LCP =
            (labAudit.metrics.details?.items[0].largestContentfulPaint ??
              "no data") / 1000;
          const CLS = parseFloat(
            labAudit["cumulative-layout-shift"].displayValue
          );
          const TBT =
            (labAudit.metrics.details?.items[0].totalBlockingTime ??
              "no data") / 1000;
          const MaxFID =
            labAudit.metrics.details?.items[0].maxPotentialFID ?? "no data";
          const speedIndex =
            (labAudit.metrics.details?.items[0].speedIndex ?? "no data") / 1000;
          const pageSize = parseFloat(
            (labAudit["total-byte-weight"].numericValue / 1000000).toFixed(3)
          );
          const date = moment().format("YYYY-MM-DD");

          const finalObj = {
            testUrl,
            device_type,
            LCP,
            FCP,
            CLS,
            speedIndex,
            TTFB,
            TBT,
            MaxFID,
            pageSize,
            date,
            //TTI,
          };
          labDataRes.push(finalObj);
        } catch (err) {
          console.log(`Problem retrieving results for ${url}`);
          console.log(
            err.response?.data.error.message ??
              `Connection error: ${err.message}`
          );
          labResErrors.push({
            url,
            reason:
              err.response?.data.error.message ??
              `Connection error: ${err.message}`,
          });
        }
      }
    }
  }

  const labDataResFilter = labDataRes.filter((obj) => obj !== undefined);
  console.log("Writing lab data...");
  await writeFile(
    `./${folder}/results-test.csv`,
    parse(labDataResFilter)
  ).catch((err) => console.log(`Error writing Lab JSON file:${err}`));

  if (labResErrors.length > 0) {
    console.log("Writing error data...");
    await writeFile(`./${folder}/errors.csv`, parse(labResErrors)).catch(
      (err) => console.log(`Error writing Origin JSON file: ${err}`)
    );
  }

  if (testNum > 1) {
    console.log("Calculating median...");

    // Collect analysed URLs in set
    const seen = new Set();

    // Reduce labDataRes array to calcualte median for the same URLs in array
    const labMedian = labDataResFilter.reduce((acc, cur, index, labArray) => {
      for (let device of device_list) {
        
        const key = `${cur.testUrl}-${cur.device_type}`; // Unique key for each URL-device combination
        if (!seen.has(key)) {
          seen.add(key);
          const sameUrl = labArray.filter(
            (obj) =>
              obj.testUrl === cur.testUrl && obj.device_type === cur.device_type
          );

          // Create object witht the same properties but calculating the median value per url
          const objMedian = {
            testUrl: cur.testUrl,
            Device: cur.device_type,
            LCP: median(sameUrl.map(({ LCP }) => LCP)),
            FCP: median(sameUrl.map(({ FCP }) => FCP)),
            CLS: median(sameUrl.map(({ CLS }) => CLS)),
            speedIndex: median(sameUrl.map(({ speedIndex }) => speedIndex)),
            TTFB: median(sameUrl.map(({ TTFB }) => TTFB)),
            TBT: median(sameUrl.map(({ TBT }) => TBT)),
            MaxFID: median(sameUrl.map(({ MaxFID }) => MaxFID)),
            pageSize: median(sameUrl.map(({ pageSize }) => pageSize)),
            date: moment().format("YYYY-MM-DD"),

            //TTI: median(sameUrl.map(({ TTI }) => TTI)),
          };

          // Push to accumulator
          acc.push(objMedian);
        }

        // Return accumulator
        return acc;
      }
    }, []);

    // Write medians to CSV file
    writeFile(`./${folder}/results-median.csv`, parse(labMedian)).catch((err) =>
      console.log(`Error writing file:${err}`)
    );
  }
  console.log(`Encountered ${labResErrors.length} errors running the tests`);
  console.log(`Ran ${testNum} test/s for a total of ${urlList.length} URL/s`);
  console.timeEnd();
};

// Call getSpeedData function (add number of test to run per URL)
getSpeedData(numTest);
