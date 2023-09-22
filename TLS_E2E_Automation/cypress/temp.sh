

CIRCLE_WORKFLOW_JOB_ID=1234

            message="Please click on the link to download the report: https://output.circle-artifacts.com/output/job/${CIRCLE_WORKFLOW_JOB_ID}/artifacts/0/TLS_E2E_Automation/cypress/cucmberReport.tar"
curl -X POST -H 'Content-type: application/json' --data "{
  \"channel\": \"C05PJHA3NTD\",
  \"username\": \"CircleCI\",
  \"text\": \"$message\"
}" https://hooks.slack.com/services/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
