import requests
import json
import xmltodict


def get_assetsyncoutbound(url, headers, from_date, to_date):

    payload = """
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cm="http://ouaf.oracle.com/webservices/cm/CM-EMPLOYEE">
   <soapenv:Header/>
   <soapenv:Body>
      <cm:ExtractAssetSync>
         <cm:FROM_DATE>2020-01-01T18:00:21.000+00:00</cm:FROM_DATE>
         <cm:TO_DATE>2020-09-30T18:00:21.000+00:00</cm:TO_DATE>
      </cm:ExtractAssetSync>
   </soapenv:Body>
</soapenv:Envelope>
    """

    response = requests.request("POST", url, data=payload, headers=headers)
    response_xml = response.content
    middleware_response_json = json.loads(
        json.dumps(xmltodict.parse(response_xml)))
    return middleware_response_json['env:Envelope']['env:Body']['ouaf:ExtractAssetSync']['ouaf:results']
    # return middleware_response_json
