import requests
import json
import xmltodict


def get_workorderactivity(url, headers, from_date, to_date):

    payload = payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cm="http://ouaf.oracle.com/webservices/cm/CM-WORKORDERACTIVITY">
   <soapenv:Header/>
   <soapenv:Body>
      <cm:ExtractWorkOrderActivity>
        <cm:FROM_DATE>2020-01-01T18:00:21.000+00:00</cm:FROM_DATE>
        <cm:TO_DATE>2020-10-01T18:00:21.000+00:00</cm:TO_DATE> 
      </cm:ExtractWorkOrderActivity>
   </soapenv:Body>
</soapenv:Envelope>
    """

    response = requests.request("POST", url, data=payload, headers=headers)
    response_xml = response.content
    # print(response_xml)
    middleware_response_json = json.loads(
        json.dumps(xmltodict.parse(response_xml)))
    return middleware_response_json['env:Envelope']['env:Body']['ouaf:ExtractWorkOrderActivity']['ouaf:results']

