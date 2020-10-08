import requests
import json
import xmltodict


def get_employee(url, headers, from_date, to_date):

    payload = payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cm="http://ouaf.oracle.com/webservices/cm/CM-EMPLOYEE">
   <soapenv:Header/>
   <soapenv:Body>
      <cm:ExtractEmployee>
         <cm:FROM_DATE>2020-03-01T18:00:21.000+00:00</cm:FROM_DATE>
         <cm:TO_DATE>2020-03-05T18:00:21.000+00:00</cm:TO_DATE>
      </cm:ExtractEmployee>
   </soapenv:Body>
</soapenv:Envelope>
    """

    response = requests.request("POST", url, data=payload, headers=headers)
    response_xml = response.content
    middleware_response_json = json.loads(
        json.dumps(xmltodict.parse(response_xml)))
    return middleware_response_json['env:Envelope']['env:Body']['ouaf:ExtractEmployee']['ouaf:results']
    # return middleware_response_json
