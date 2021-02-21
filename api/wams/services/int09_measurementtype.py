from requests import Session
from requests.auth import HTTPBasicAuth

import json
import requests
import xmltodict


def get_measurementtype():

    r = requests.post("http://139.59.125.201/getMeasurementType.php")
    return json.loads(r.content);

    # wsdl = "https://pasb-dev-uwa-iws.oracleindustry.com/ouaf/webservices/CM-MEAUSREMENTTYPE?WSDL"
    # session = Session()
    # session.auth = HTTPBasicAuth("RFID_INTEGRATION", "Rfid_1nt")

    # client = Client(wsdl, transport=Transport(session=session),
    #                 settings=Settings(strict=False, raw_response=True))

    # response = client.service.ExtractMeasurementType()
    # response_xml = response.content
    # # print(response_xml)
    # middleware_response_json = json.loads(
    #     json.dumps(xmltodict.parse(response_xml)))
    # return middleware_response_json['env:Envelope']['env:Body']['ouaf:ExtractMeasurementType']['ouaf:results']
